import { ActionContext } from "vuex";
import { Container } from "typedi";
import { RootState, SelectedSessionState } from "@/store/types";
import {
  createModule,
  provideInitialStatus,
  updateStatus,
} from "@/store/createModule";
import { PracticeSession } from "../../../common/types/PracticeSession";
import { getStoreAccessors } from "typesafe-vuex";
import { PracticeSessionsResource } from "@/lib/practiceSessions.resource";
import { without } from "lodash";
import router, { ROUTES } from "@/router";

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
          steps: [...context.state.session.steps, stepId],
        });
      },
      async removeStep(context: SelectedSessionContext, stepId: string) {
        if (!context.state.session) {
          return;
        }

        await dispatchUpdateSession(context, {
          steps: without(context.state.session.steps, stepId),
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
      async toggleLockSession(context: SelectedSessionContext) {
        if (!context.state.session) {
          return;
        }

        const resource = Container.get(PracticeSessionsResource);
        const updatedSession: PracticeSession = {
          ...context.state.session,
          locked: !context.state.session.locked,
        };

        commitSetSession(context, updatedSession);
        await resource.update(context.state.session.id, updatedSession);
      },
      async removeSession(context: SelectedSessionContext) {
        if (!context.state.session) {
          return;
        }

        const resource = Container.get(PracticeSessionsResource);
        await resource.remove(context.state.session.id);
        await router.push({ name: ROUTES.SESSIONS });
        commitSetSession(context, null);
      },
    },
    mutations: {
      updateStatus,
      setSession(state: SelectedSessionState, payload: PracticeSession | null) {
        state.session = payload;
      },
      updateSession(
        state: SelectedSessionState,
        payload: Partial<Pick<PracticeSession, "steps" | "name" | "locked">>
      ) {
        if (state.session && !state.session.locked) {
          state.session = {
            ...state.session,
            ...payload,
          };
        }
      },
    },
    getters: {},
  },
  {
    ...provideInitialStatus(),
    session: null,
  } as SelectedSessionState
);

const { commit, dispatch } = getStoreAccessors<SelectedSessionState, RootState>(
  "selectedSession"
);

const { mutations, actions } = selectedSession;

const commitUpdateStatus = commit(mutations.updateStatus);
const commitSetSession = commit(mutations.setSession);
const commitUpdateSession = commit(mutations.updateSession);

export const dispatchFetchSession = dispatch(actions.fetchSession);
export const dispatchUpdateSession = dispatch(actions.updateSession);
export const dispatchAddStep = dispatch(actions.addStep);
export const dispatchRemoveStep = dispatch(actions.removeStep);
export const dispatchToggleLockSession = dispatch(actions.toggleLockSession);
export const dispatchRemoveSession = dispatch(actions.removeSession);
