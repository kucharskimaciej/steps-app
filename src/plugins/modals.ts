import { MODAL_STYLE } from "@/lib/modals/modals";
import { Plugin } from "vue";

const ModalsPlugin: Plugin = (app) => {
  app.config.globalProperties.$modalStyle = MODAL_STYLE;
  app.config.globalProperties.$modalTarget = "MODAL_TARGET";
};

export default ModalsPlugin;
