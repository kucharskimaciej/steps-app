<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { PortalTarget } from "portal-vue";
import { VueWithStore } from "@/lib/vueWithStore";
import {
  dispatchCloseModal,
  dispatchCloseTopModal,
  getOpenModals
} from "@/store";
import Modal from "@/components/Modal/Modal.vue";
import Backdrop from "@/components/Modal/Backdrop.vue";
import { ModalRef } from "@/lib/modals/modals";

@Component({
  components: {
    Modal,
    Backdrop,
    PortalTarget
  }
})
export default class ModalContainer extends VueWithStore {
  inlineModalOpen = false;

  @Watch("topModal")
  @Watch("inlineModalOpen")
  handleTopModalChange(value: ModalRef | boolean) {
    if (value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  get anyModalOpen() {
    return this.inlineModalOpen || this.openModals.length > 0;
  }

  get openModals() {
    return getOpenModals(this.$store);
  }

  get topModal() {
    const [top] = this.openModals;
    return top;
  }
  get backgroundModals() {
    if (this.inlineModalOpen) {
      return this.openModals;
    }

    const [, ...other] = this.openModals;
    return other;
  }

  closeTopModal() {
    dispatchCloseTopModal(this.$store);
  }

  closeModal(modalUuid: string) {
    dispatchCloseModal(this.$store, modalUuid);
  }
}
</script>

<template>
  <aside
    :class="{
      'fixed inset-0 flex z-20': anyModalOpen,
      hidden: !anyModalOpen
    }"
  >
    <Modal
      v-for="modal in backgroundModals"
      :key="modal.uuid"
      :modal="modal"
      @close-modal="closeModal(modal.uuid)"
    />

    <PortalTarget name="modal-backdrop" slim>
      <Backdrop @click="closeTopModal()" />
    </PortalTarget>

    <Modal
      v-if="!inlineModalOpen && topModal"
      :modal="topModal"
      @close-modal="closeModal(topModal.uuid)"
    />

    <PortalTarget name="modal" slim @change="inlineModalOpen = $event" />
  </aside>
</template>
