<script lang="ts">
import { intersectComponentPropsType } from "@/components/Intersect/intersectComponentProps";
import { defineComponent, ref, onBeforeUnmount, watch } from "vue";

const Intersect = defineComponent({
  props: intersectComponentPropsType,
  emits: ["change"],
  setup(props, { emit }) {
    const observer = ref<IntersectionObserver>();
    const content = ref();

    function onChange(entry: IntersectionObserverEntry) {
      emit("change", entry);
    }

    observer.value = new IntersectionObserver(
      ([entry]) => {
        onChange(entry);
      },
      {
        threshold: props.threshold,
        root: props.viewportRoot,
      }
    );

    watch(
      content,
      (el) => {
        if (el) {
          observer.value?.disconnect();
          observer.value?.observe(el as Element);
        }
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    return {
      content,
    };
  },
});

export default Intersect;
</script>

<template>
  <div ref="content" class="w-full h-full">
    <slot />
  </div>
</template>
