import { ActionContext } from "vuex";
import { Container } from "vue-typedi";
import { RootState, SelectedSessionState } from "@/store/types";
import {
  createModule,
  provideInitialStatus,
  updateStatus
} from "@/store/createModule";
import { PracticeSession } from "../../../../common/types/PracticeSession";
import { getStoreAccessors } from "typesafe-vuex";
import { PracticeSessionsResource } from "@/lib/practiceSessions.resource";
import { without } from "lodash";

type SelectedSessionContext = ActionContext<SelectedSessionState, RootState>;

export const selectedSession = createModule(
  {
    actions: {
      async fetchSession(context: SelectedSessionContext, sessionId: string) {
        commitUpdateStatus(context, "pending");
        const resource = Container.get(PracticeSessionsResource);
        const result = await resource.fetch(sessionId);
        commitSetSession(context, result);
        commitUpdateStatus(context, "dirty");
      },
      async addStep(context: SelectedSessionContext, stepId: string) {
        if (!context.state.session) {
          return;
        }

        await dispatchUpdateSession(context, {
          steps: [...context.state.session.steps, stepId]
        });
      },
      async removeStep(context: SelectedSessionContext, stepId: string) {
        if (!context.state.session) {
          return;
        }

        await dispatchUpdateSession(context, {
          steps: without(context.state.session.steps, stepId)
        });
      },
      async changeName(context: SelectedSessionContext, name: string) {
        await dispatchUpdateSession(context, { name });
      },
      async updateSession(
        context: SelectedSessionContext,
        payload: Partial<Pick<PracticeSession, "steps" | "name">>
      ) {
        if (!context.state.session) {
          return;
        }

        const resource = Container.get(PracticeSessionsResource);
        commitUpdateSession(context, payload);
        await resource.update(context.state.session.id, payload);
      },
      async closeSession(context: SelectedSessionContext) {
        if (
          !context.state.session ||
          context.state.session.status !== "closed"
        ) {
          return;
        }

        const resource = Container.get(PracticeSessionsResource);
        const closedSession: PracticeSession = {
          ...context.state.session,
          status: "closed",
          closed_at: Date.now()
        };

        commitSetSession(context, closedSession);
        await resource.update(context.state.session.id, closedSession);
      }
    },
    mutations: {
      updateStatus,
      setSession(state: SelectedSessionState, payload: PracticeSession) {
        state.session = payload;
      },
      updateSession(
        state: SelectedSessionState,
        payload: Partial<Pick<PracticeSession, "steps" | "name">>
      ) {
        if (state.session?.status === "open") {
          state.session = {
            ...state.session,
            ...payload
          };
        }
      }
    },
    getters: {
      getIsClosed(state: SelectedSessionState): boolean {
        if (!state.session) {
          return false;
        }

        return state.session.status === "closed";
      }
    }
  },
  {
    ...provideInitialStatus(),
    session: null
  } as SelectedSessionState
);

const { commit, dispatch, read } = getStoreAccessors<
  SelectedSessionState,
  RootState
>("selectedSession");

const { mutations, actions, getters } = selectedSession;

const commitUpdateStatus = commit(mutations.updateStatus);
const commitSetSession = commit(mutations.setSession);
const commitUpdateSession = commit(mutations.updateSession);

export const dispatchFetchSession = dispatch(actions.fetchSession);
export const dispatchUpdateSession = dispatch(actions.updateSession);
export const dispatchAddStep = dispatch(actions.addStep);
export const dispatchRemoveStep = dispatch(actions.removeStep);
export const dispatchCloseSession = dispatch(actions.closeSession);

export const getIsClosed = read(getters.getIsClosed);
