import { Plugin } from "vue";
import { ROUTES } from "@/router";

const RoutesPlugin: Plugin = (app) => {
  app.config.globalProperties.$routes = ROUTES;
};

export default RoutesPlugin;
