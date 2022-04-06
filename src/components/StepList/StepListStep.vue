<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Step } from "../../../common/types/Step";

const StepListStep = defineComponent({
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
    isActive: Boolean,
    isSelected: Boolean,
  },
});

export default StepListStep;
</script>

<template>
  <article
    class="flex items-start relative px-2 py-4 border border-gray-300 hover:border-gray-400"
    :class="{
      'bg-gray-200 bg-opacity-50': !isActive && !isSelected,
      'bg-gray-200 bg-opacity-75': isSelected,
      'bg-white shadow-md border-gray-400 z-10': isActive,
    }"
  >
    <slot name="before" />

    <header class="mx-4 font-heading font-normal leading-tight">
      {{ step.name }}
    </header>
  </article>
</template>
