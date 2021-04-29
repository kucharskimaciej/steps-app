<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import StepListStep from "@/components/StepList/StepListStep.vue";
import { Step } from "../../../common/types/Step";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import Card from "@/components/Card/Card.vue";

type StateFn = (step: Step) => boolean;

@Component({
  components: {
    StepListStep,
    SelectToggleWidget,
    Card
  }
})
export default class StepList extends Vue {
  @Prop({ required: true }) private steps!: Step[];
  @Prop({ default: () => false }) isSelected!: StateFn;
  @Prop({ default: () => false }) isActive!: StateFn;

  @Emit()
  toggle(_stepId: string) {}

  @Emit()
  activeStepChange(_stepId: string) {}
}
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
      @click="activeStepChange(step.id)"
    >
      <template #before>
        <aside class="ml-2 -mt-px" @click.stop="">
          <SelectToggleWidget
            :selected="isSelected(step)"
            @toggle="toggle(step.id)"
          />
        </aside>
      </template>
    </StepListStep>
  </section>
</template>
