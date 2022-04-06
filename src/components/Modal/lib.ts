import { VueConstructor } from "vue";
import { MODAL_STYLE } from "@/lib/modals/modals";
// import Drawer from "@/components/Modal/Drawer.vue";
import Overlay from "@/components/Modal/Overlay.vue";
import BorderlessOverlay from "@/components/Modal/BorderlessOverlay.vue";
import Popup from "@/components/Modal/Popup.vue";

export const ModalStyleComponents: Record<MODAL_STYLE, VueConstructor> = {
  // [MODAL_STYLE.DRAWER]: Drawer,
  [MODAL_STYLE.OVERLAY]: Overlay,
  [MODAL_STYLE.BORDERLESS]: BorderlessOverlay,
  [MODAL_STYLE.POPUP]: Popup,
};
