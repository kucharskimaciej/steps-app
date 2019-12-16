import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "@/store/types";
import { AuthModule } from "@/store/modules/auth";
import { StepsModule } from "@/store/modules/steps";

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
    modules: {
        auth: AuthModule,
        steps: StepsModule
    }
});
