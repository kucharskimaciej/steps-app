import { MODAL_STYLE } from "@/lib/modals/modals";
import Drawer from "@/components/Modal/Drawer.vue";
import Overlay from "@/components/Modal/Overlay.vue";
import BorderlessOverlay from "@/components/Modal/BorderlessOverlay.vue";
import { VueConstructor } from "vue";

export const ModalStyleComponents: Record<MODAL_STYLE, VueConstructor> = {
  [MODAL_STYLE.DRAWER]: Drawer,
  [MODAL_STYLE.OVERLAY]: Overlay,
  [MODAL_STYLE.BORDERLESS]: BorderlessOverlay
};
