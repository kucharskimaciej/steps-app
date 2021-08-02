import Vue from "vue";
import { MODAL_STYLE } from "@/lib/modals/modals";

export default function ModalsPlugin() {
  Vue.prototype.$modalStyle = MODAL_STYLE;
}
