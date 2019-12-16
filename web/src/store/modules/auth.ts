import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AuthState } from "@/store/types";

export type UserStatus = "AUTHENTICATED" | "NO_AUTH";

@Module({ name: "auth" })
export class AuthModule extends VuexModule implements AuthState {

    get status(): UserStatus {
        return this.uid ? "AUTHENTICATED" : "NO_AUTH";
    }
    public uid: string = "";

    @Action({ commit: "setUid" })
    public handleAuthStateChange(uid: string) {
        return uid;
    }

    @Mutation
    private setUid(uid: string) {
        this.uid = uid;
    }
}
