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
  @Prop({ default: () => ({}) }) private modalProps!: Record<string, any>;

  @Emit()
  closeModal() {}
}
</script>

<template>
  <Portal to="modal">
    <div class="fixed inset-0 flex">
      <Backdrop @click="closeModal()" />

      <component
        :is="modalStyle"
        class="z-0"
        v-bind="{ modalProps }"
        @close="closeModal()"
      >
        <slot :close="closeModal" />
      </component>
    </div>
  </Portal>
</template>
