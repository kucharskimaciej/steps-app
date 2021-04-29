<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { MODAL_STYLE, ModalRef } from "@/lib/modals/modals";
import Drawer from "@/components/Modal/Drawer.vue";
import Overlay from "@/components/Modal/Overlay.vue";
import SessionCartModal from "@/components/SessionCartModal/SessionCartModal.vue";
import BorderlessOverlay from "@/components/Modal/BorderlessOverlay.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";

@Component({
  components: {
    // modal styles
    [MODAL_STYLE.DRAWER]: Drawer,
    [MODAL_STYLE.OVERLAY]: Overlay,
    [MODAL_STYLE.BORDERLESS]: BorderlessOverlay,

    // modal components
    SessionCartModal,
    VideoModal
  }
})
export default class Modal extends Vue {
  @Prop() private modal!: ModalRef;

  @Emit()
  closeModal() {}

  get componentName() {
    return this.modal.component.name;
  }

  get props() {
    return this.modal.options.props;
  }
}
</script>

<template>
  <component :is="modal.options.style" class="z-0" @close="closeModal()">
    <component :is="componentName" v-bind="props" />
  </component>
</template>
