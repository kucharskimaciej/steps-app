<script lang="ts">
import { defineComponent, ref } from "vue";
import { intersectComponentPropsType } from "@/components/Intersect/intersectComponentProps";
import Intersect from "@/components/Intersect/Intersect";

const IntersectSwitch = defineComponent({
  components: {
    Intersect
  },
  props: {
    ...intersectComponentPropsType,
    visibilityThreshold: {
      type: Number,
      default: 0.7
    }
  },
  emits: ["change"],
  setup(props, { emit }) {
    const currentlyVisible = ref(false);
    const currentRatio = ref(1);

    function handleChange(entry: IntersectionObserverEntry) {
      currentRatio.value = entry.intersectionRatio;
      currentlyVisible.value = currentRatio.value > props.visibilityThreshold;

      emit("change", {
        entry,
        ratio: currentRatio.value,
        visible: currentlyVisible.value
      });
    }

    return {
      handleChange,
      currentRatio,
      currentlyVisible
    };
  }
});

export default IntersectSwitch;
</script>

<template>
  <Intersect v-bind="$props" @change="handleChange($event)">
    <slot :visible="currentlyVisible" :ratio="currentRatio">
      <slot v-if="currentlyVisible" name="visible" />
      <slot v-else name="hidden" />
    </slot>
  </Intersect>
</template>
