<script lang="ts">
import { Vue, Component, Emit, Prop, Provide } from "vue-property-decorator";
import { ModalRef } from "@/lib/modals/modals";
import SessionCartModal from "@/components/SessionCartModal/SessionCartModal.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";
import SearchOverlay from "@/components/SearchOverlay/SearchOverlay.vue";
import { ModalStyleComponents } from "@/components/Modal/lib";

@Component({
  components: {
    // modal styles
    ...ModalStyleComponents,

    // modal components
    SessionCartModal,
    VideoModal,
    SearchOverlay
  }
})
export default class Modal extends Vue {
  @Prop() private modal!: ModalRef;

  @Provide()
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
