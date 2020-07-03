import { Container } from "vue-typedi";
import { UserResource } from "@/lib/user.resource";
import { User } from "../../../../common/types/User";
import { without } from "lodash";
import { CurrentUserState, RootState } from "@/store/types";
import { ActionContext } from "vuex";
import { getStoreAccessors } from "typesafe-vuex";

type CurrentUserContext = ActionContext<CurrentUserState, RootState>;

export const currentUser = {
  namespaced: true,
  state: {
    user: { practice: [] }
  } as CurrentUserState,
  getters: {
    practiceSteps(state: CurrentUserState): Record<string, boolean> {
      if (state.user) {
        return (state.user.practice || []).reduce(
          ($, stepId) => ({
            ...$,
            [stepId]: true
          }),
          {}
        );
      }

      return {};
    }
  },
  mutations: {
    setUser(state: CurrentUserState, user: User) {
      state.user = user;
    }
  },
  actions: {
    async updateUser(context: CurrentUserContext, payload: Partial<User>) {
      const usersResource = Container.get(UserResource);
      const updatedUser = await usersResource.upsert(
        context.rootState.auth.uid,
        payload
      );
      commitSetUser(context, updatedUser);
    },
    async fetchUser(context: CurrentUserContext) {
      const usersResource = Container.get(UserResource);
      const user = await usersResource.fetch(context.rootState.auth.uid);
      commitSetUser(context, user);
    },
    async toggleStepPractice(context: CurrentUserContext, stepId: string) {
      if (stepId in practiceSteps(context)) {
        await dispatchUpdateUser(context, {
          practice: without(context.state.user.practice, stepId)
        });
      } else {
        await dispatchUpdateUser(context, {
          practice: [...context.state.user.practice, stepId]
        });
      }
    }
  }
};

const { getters, mutations, actions } = currentUser;
const { commit, read, dispatch } = getStoreAccessors<
  CurrentUserState,
  RootState
>("currentUser");

// MUTATIONS
const commitSetUser = commit(mutations.setUser);

// GETTERS
export const practiceSteps = read(getters.practiceSteps);

// ACTIONS
export const dispatchUpdateUser = dispatch(actions.updateUser);
export const dispatchFetchUser = dispatch(actions.fetchUser);
export const dispatchToggleStepPractice = dispatch(actions.toggleStepPractice);
