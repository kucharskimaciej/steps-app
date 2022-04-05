<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import StepListStep from "@/components/StepList/StepListStep.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import Card from "@/components/Card/Card.vue";
import { Step } from "../../../common/types/Step";

type StateFn = (step: Step) => boolean;

const StepList = defineComponent({
  components: {
    StepListStep,
    SelectToggleWidget,
    Card
  },
  props: {
    steps: {
      type: Array as PropType<Step[]>,
      required: true
    },
    isSelected: {
      type: Function as PropType<StateFn>,
      default: () => false
    },
    isActive: {
      type: Function as PropType<StateFn>,
      default: () => false
    }
  },
  emits: ["toggle", "activeStepChange"]
});

export default StepList;
</script>

<template>
  <section>
    <StepListStep
      v-for="step in steps"
      :key="step.id"
      :step="step"
      :is-active="isActive(step)"
      :is-selected="isSelected(step)"
      class="-mt-px hover:z-10"
      @click="$emit('activeStepChange', step.id)"
    >
      <template #before>
        <aside class="ml-2 -mt-px" @click.stop="">
          <SelectToggleWidget
            :selected="isSelected(step)"
            @toggle="$emit('toggle', step.id)"
          />
        </aside>
      </template>
    </StepListStep>
  </section>
</template>
