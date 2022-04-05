<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Overlay from "@/components/Modal/Overlay.vue";
import { useModalView } from "@/components/Modal/modalClass";

const BorderlessOverlay = defineComponent({
  components: {
    Overlay
  },
  emits: ["close"],
  setup(_, ctx) {
    return useModalView(ctx);
  }
});

export default BorderlessOverlay;
</script>

<template>
  <Overlay borderless @close="close()"><slot /></Overlay>
</template>
