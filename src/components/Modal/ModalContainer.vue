<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import Backdrop from "@/components/Modal/Backdrop.vue";
import { PortalTarget } from "portal-vue";

const ModalContainer = defineComponent({
  components: {
    Backdrop,
    PortalTarget
  },
  setup() {
    const inlineModalOpen = ref(false);

    watch(inlineModalOpen, value => {
      if (value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    });

    return { inlineModalOpen };
  }
});

export default ModalContainer;
</script>

<template>
  <PortalTarget
    :class="{
      'z-20 relative': inlineModalOpen,
      hidden: !inlineModalOpen
    }"
    name="modal"
    multiple
    @change="inlineModalOpen = $event"
  />
</template>
