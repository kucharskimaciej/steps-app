import { ActionContext } from "vuex";
import { AuthState, RootState } from "@/store/types";
import { getStoreAccessors } from "typesafe-vuex";

type AuthContext = ActionContext<AuthState, RootState>;

export const auth = {
  namespaced: true,
  state: {
    uid: ""
  } as AuthState,
  actions: {
    async handleAuthStateChange(context: AuthContext, uid: string) {
      commitSetUid(context, uid);
    }
  },
  mutations: {
    setUid(state: AuthState, uid: string) {
      state.uid = uid;
    }
  },
  getters: {
    getUid(state: AuthState): string {
      return state.uid;
    }
  }
};

const { read, commit, dispatch } = getStoreAccessors<AuthState, RootState>(
  "auth"
);

// MUTATIONS
const commitSetUid = commit(auth.mutations.setUid);

// ACTIONS
export const dispatchHandleAuthStateChange = dispatch(
  auth.actions.handleAuthStateChange
);

// GETTERS
export const getUid = read(auth.getters.getUid);
