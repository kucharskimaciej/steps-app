<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";

const ModalContainer = defineComponent({
  setup() {
    const containerRef = ref<HTMLElement | null>(null);
    const inlineModalOpen = ref(false);

    const observer = new MutationObserver(() => {
      inlineModalOpen.value = !!containerRef.value?.children.length;
      if (inlineModalOpen.value) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    });

    onMounted(() => {
      nextTick(() => {
        if (containerRef.value) {
          observer.observe(containerRef.value, {
            subtree: false,
            childList: true,
          });
        }
      });
    });

    onUnmounted(() => {
      observer.disconnect();
    });

    return {
      containerRef,
      inlineModalOpen,
    };
  },
});

export default ModalContainer;
</script>

<template>
  <span
    ref="containerRef"
    :id="$modalTarget"
    :class="{
      'z-20 relative': inlineModalOpen,
      hidden: !inlineModalOpen,
    }"
  ></span>
</template>
