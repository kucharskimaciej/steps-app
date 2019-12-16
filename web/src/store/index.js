import Vue from "vue";
import Vuex from "vuex";
import { AuthModule } from "@/store/modules/auth";
import { StepsModule } from "@/store/modules/steps";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        auth: AuthModule,
        steps: StepsModule
    }
});
//# sourceMappingURL=index.js.map