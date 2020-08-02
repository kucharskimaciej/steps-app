import "reflect-metadata";
import Vue from "vue";
import VueTypedi from "vue-typedi";
import Vuex from "vuex";
import { provideStore } from "@/store";
import "./main.scss";
import router from "./router";
import "./filters";
import "./plugins";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueTypedi);

new Vue({
  router,
  store: provideStore(),
  render: h => h(App)
}).$mount("#app");

// import "./registerServiceWorker";
