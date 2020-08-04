import { ActionContext } from "vuex";
import { Container } from "vue-typedi";
import { getStoreAccessors } from "typesafe-vuex";
import { pick } from "lodash";
import { PracticeSessionsState, RootState, Status } from "@/store/types";
import { PracticeSession } from "../../../../common/types/PracticeSession";
import { createModule } from "@/store/createModule";
import {
  CreateParams,
  PracticeSessionsResource
} from "@/lib/practiceSessions.resource";
import { getUid, provideStore } from "@/store";

type Context = ActionContext<PracticeSessionsState, RootState>;

export const practiceSessions = createModule(
  {
    mutations: {
      updateStatus(state: PracticeSessionsState, payload: Status) {
        state.status = payload;
      },
      setSessions(state: PracticeSessionsState, payload: PracticeSession[]) {
        state.sessions = payload;
      },
      removeSession(state: PracticeSessionsState, sessionId: string) {
        state.sessions = state.sessions.filter(
          session => session.id !== sessionId
        );
      },
      addSession(state: PracticeSessionsState, session: PracticeSession) {
        state.sessions.push(session);
      }
    },
    actions: {
      async fetchAllSessions(context: Context) {
        commitUpdateStatus(context, "pending");
        const resource = Container.get(PracticeSessionsResource);
        const result = await resource.query(getUid(provideStore()));
        commitSetSessions(context, result);
        commitUpdateStatus(context, "dirty");
      },
      async createSession(context: Context, payload: CreateParams) {
        const resource = Container.get(PracticeSessionsResource);
        await resource.create(payload);
        await dispatchFetchAllSessions(context);
      },
      async duplicateSession(context: Context, payload: string) {
        const sessionToDuplicate = context.state.sessions.find(
          session => session.id === payload
        );

        if (!sessionToDuplicate) {
          return;
        }

        await dispatchCreateSession(
          context,
          pick(sessionToDuplicate, "name", "steps", "owner_uid")
        );
      }
    },
    getters: {
      getSessions(state: PracticeSessionsState): PracticeSession[] {
        return state.sessions;
      }
    }
  },
  {
    status: "clean",
    sessions: []
  } as PracticeSessionsState
);

const { commit, read, dispatch } = getStoreAccessors<
  PracticeSessionsState,
  RootState
>("practiceSessions");

const { getters, mutations, actions } = practiceSessions;

const commitUpdateStatus = commit(mutations.updateStatus);
const commitSetSessions = commit(mutations.setSessions);

export const getSessions = read(getters.getSessions);

export const dispatchFetchAllSessions = dispatch(actions.fetchAllSessions);
export const dispatchCreateSession = dispatch(actions.createSession);
export const dispatchDuplicateSession = dispatch(actions.duplicateSession);
