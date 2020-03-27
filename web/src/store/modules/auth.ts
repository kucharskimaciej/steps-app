import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AuthState } from "@/store/types";

@Module({ name: "auth", namespaced: true })
export class AuthModule extends VuexModule implements AuthState {
  public uid = "";

  @Action
  public async handleAuthStateChange(uid: string) {
    this.context.commit("SET_UID", uid);
    if (uid) {
      await this.context.dispatch("currentUser/fetchUser", uid, {
        root: true
      });
    }
  }

  @Mutation
  private SET_UID(uid: string) {
    this.uid = uid;
  }
}
