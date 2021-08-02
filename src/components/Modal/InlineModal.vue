<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import { Portal } from "portal-vue";
import { ModalStyleComponents } from "@/components/Modal/lib";
import Backdrop from "@/components/Modal/Backdrop.vue";
import { MODAL_STYLE } from "@/lib/modals/modals";

@Component({
  components: {
    Portal,
    ...ModalStyleComponents,
    Backdrop
  }
})
export default class InlineModal extends Vue {
  @Prop({ default: MODAL_STYLE.OVERLAY }) private modalStyle!: MODAL_STYLE;

  @Emit()
  closeModal() {}
}
</script>

<template>
  <span>
    <Portal to="modal">
      <Backdrop @click="closeModal()" />
    </Portal>

    <Portal to="modal">
      <component :is="modalStyle" class="z-0" @close="closeModal()">
        <slot />
      </component>
    </Portal>
  </span>
</template>
