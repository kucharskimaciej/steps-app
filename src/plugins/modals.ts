import Vue from "vue";
import { MODAL_STYLE, MODALS } from "@/lib/modals/modals";
import { ModalsService } from "@/lib/modals/service";
import { dispatchOpenModal, provideStore } from "@/store";

export default function ModalsPlugin() {
  Vue.prototype.$modals = MODALS;
  Vue.prototype.$modalStyle = MODAL_STYLE;
  Vue.prototype.$openModal = <TKey extends MODALS>(
    modal: TKey,
    ...params: Parameters<ModalsService[TKey]>
  ) => {
    dispatchOpenModal(provideStore(), {
      modal,
      params
    });
  };
}
