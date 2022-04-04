<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import PureStepListItem from "@/components/StepList/PureStepListItem.vue";
import { Step } from "../../../common/types/Step";

const PureStepList = defineComponent({
  components: {
    PureStepListItem
  },
  props: {
    steps: Array as PropType<Step[]>,
    isSelected: {
      type: Function as PropType<(stepId: string) => boolean>,
      default: () => false
    }
  }
});

export default PureStepList;
</script>

<template>
  <section class="h-full overflow-y-auto overflow-x-hidden">
    <PureStepListItem
      v-for="step in steps"
      :key="step.id"
      class="mb-2"
      :step="step"
      :is-selected="isSelected(step.id)"
      @select="$emit('select', step.id)"
    />
  </section>
</template>
