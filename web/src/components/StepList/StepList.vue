<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import StepListStep from "@/components/StepList/StepListStep.vue";
import { Step } from "../../../../common/types/Step";

type StateFn = (step: Step) => boolean;

@Component({
  components: {
    StepListStep
  }
})
export default class StepList extends Vue {
  @Prop({ required: true }) private steps!: Step[];
  @Prop({ default: () => false }) isSelected!: StateFn;
  @Prop({ default: () => false }) isActive!: StateFn;

  @Emit()
  stepClick() {}
}
</script>

<template>
  <section class="h-full overflow-y-auto overflow-x-hidden">
    <StepListStep
      v-for="step in steps"
      :key="step.id"
      :step="step"
      :is-active="isActive(step)"
      :is-selected="isSelected(step)"
      @click="stepClick(step.id)"
    />
  </section>
</template>
