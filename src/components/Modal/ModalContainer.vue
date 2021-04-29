<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
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
    Backdrop
  }
})
export default class ModalContainer extends VueWithStore {
  @Watch("topModal")
  handleTopModalChange(value: ModalRef) {
    if (value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }

  get openModals() {
    return getOpenModals(this.$store);
  }

  get topModal() {
    const [top] = this.openModals;
    return top;
  }

  get otherModals() {
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
  <aside v-if="openModals.length > 0">
    <div class="fixed inset-0 flex z-20">
      <Modal
        v-for="modal in otherModals"
        :key="modal.uuid"
        :modal="modal"
        @close-modal="closeModal(modal.uuid)"
      />

      <Backdrop @click="closeTopModal()" />

      <Modal :modal="topModal" @close-modal="closeModal(topModal.uuid)" />
    </div>
  </aside>
</template>
