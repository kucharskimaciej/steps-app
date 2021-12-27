import "reflect-metadata";
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import VueTypedi from "vue-typedi";
import Vuex from "vuex";
import PortalVue from "portal-vue";
import { provideStore } from "@/store";
import "./main.css";
import router from "./router";
import "./filters";
import "./plugins";
import "../common/config";

import App from "./App.vue";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(Vuex);
Vue.use(VueTypedi);
Vue.use(PortalVue);
Vue.use(VueCompositionAPI);

new Vue({
  router,
  store: provideStore(),
  render: h => h(App)
}).$mount("#app");

// import "./registerServiceWorker";
