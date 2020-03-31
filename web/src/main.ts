import "reflect-metadata";
import Vue from "vue";
import VueTypedi from "vue-typedi";
import store from "@/store";
import "./registerServiceWorker";
import "./main.scss";
import App from "./App.vue";
import router from "./router";
import "./filters";

Vue.config.productionTip = false;

Vue.use(VueTypedi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
