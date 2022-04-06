import { MODAL_STYLE } from "@/lib/modals/modals";
import { Plugin } from "vue";

const ModalsPlugin: Plugin = (app) => {
  app.config.globalProperties.$modalStyle = MODAL_STYLE;
};

export default ModalsPlugin;
