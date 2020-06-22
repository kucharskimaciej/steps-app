<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import PureStepListItem from "@/components/StepList/PureStepListItem.vue";
import { Step } from "../../../../common/types/Step";

@Component({
  components: {
    PureStepListItem
  }
})
export default class PureStepList extends Vue {
  @Prop() private steps!: Step[];
  @Prop({ default: () => false }) private isSelected!: (
    stepId: string
  ) => boolean;

  @Emit()
  select(stepId: string) {}
}
</script>

<template>
  <section class="h-full overflow-y-auto overflow-x-hidden pr-4">
    <PureStepListItem
      class="mb-2"
      v-for="step in steps"
      :step="step"
      :key="step.id"
      :is-selected="isSelected(step.id)"
      @select="select(step.id)"
    />
  </section>
</template>
