import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AuthState } from "@/store/types";
import store from "../index";

@Module({ name: "auth", namespaced: true, dynamic: true, store })
export class AuthModule extends VuexModule implements AuthState {
    public uid: string = "";

    @Action({rawError:true})
    public async handleAuthStateChange(uid: string) {
        this.context.commit("SET_UID", uid);
        await this.context.dispatch("currentUser/fetchUser", uid, {
            root: true
        });
    }

    @Mutation
    private SET_UID(uid: string) {
        this.uid = uid;
    }
}
