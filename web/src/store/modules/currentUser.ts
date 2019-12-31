import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Container } from "typedi";
import { UserResource } from "@/lib/user.resource";
import { User } from "../../../../common/types/User";
import { without } from "lodash";
import { CurrentUserState } from "@/store/types";

const usersResource = Container.get(UserResource);

@Module({ name: "currentUser", namespaced: true })
export class CurrentUserModule extends VuexModule {
  user: User = { practice: [] };

  @Mutation
  SET_DATA(user: User) {
    this.user = user;
  }

  @Action({ commit: "SET_DATA" })
  updateUser(data: Partial<User>) {
    return usersResource.upsert(this.context.rootState.auth.uid, data);
  }

  @Action({ commit: "SET_DATA" })
  fetchUser() {
    return usersResource.fetch(this.context.rootState.auth.uid);
  }

  @Action
  toggleStepPractice(stepId: string) {
    const { getters, dispatch, state } = this.context;
    if (stepId in getters["practiceSteps"]) {
      return dispatch("updateUser", {
        practice: without((state as CurrentUserState).user.practice, stepId)
      });
    } else {
      return dispatch("updateUser", {
        practice: [...(state as CurrentUserState).user.practice, stepId]
      });
    }
  }

  get practiceSteps(): Record<string, boolean> {
    if (this.user) {
      return (this.user.practice || []).reduce(
        ($, stepId) => ({
          ...$,
          [stepId]: true
        }),
        {}
      );
    } else {
      return {};
    }
  }
}
