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
  select(_stepId: string) {}
}
</script>

<template>
  <section class="h-full overflow-y-auto overflow-x-hidden">
    <PureStepListItem
      v-for="step in steps"
      :key="step.id"
      class="mb-2"
      :step="step"
      :is-selected="isSelected(step.id)"
      @select="select(step.id)"
    />
  </section>
</template>
