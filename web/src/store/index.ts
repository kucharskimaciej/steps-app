import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "@/store/types";
import { StepsModule } from "@/store/modules/steps";
import { CurrentUserModule } from "@/store/modules/currentUser";
import { AuthModule } from "@/store/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    modules: {
        auth: AuthModule,
        steps: StepsModule,
        currentUser: CurrentUserModule
    }
});
