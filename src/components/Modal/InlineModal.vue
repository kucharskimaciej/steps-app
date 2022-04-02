<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { Portal } from "portal-vue";
import { ModalStyleComponents } from "@/components/Modal/lib";
import Backdrop from "@/components/Modal/Backdrop.vue";
import { MODAL_STYLE } from "@/lib/modals/modals";

const InlineModal = defineComponent({
  components: {
    Portal,
    ...ModalStyleComponents,
    Backdrop
  },
  props: {
    modalStyle: {
      default: MODAL_STYLE.OVERLAY,
      type: String as PropType<MODAL_STYLE>
    },
    modalProps: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({})
    }
  },
  emits: ["close-modal"],
  setup(_, ctx) {
    return {
      closeModal() {
        ctx.emit("close-modal");
      }
    };
  }
});

export default InlineModal;
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
