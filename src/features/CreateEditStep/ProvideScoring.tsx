import {
  getStepScore,
  StepForScoring
} from "@/lib/variations/variationStepScore";
import { VueWithStore } from "@/lib/vueWithStore";
import { rawStepsById, stableStepIds } from "@/store";
import { sortBy, without } from "lodash";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ProvideScoring extends VueWithStore {
  @Prop({ required: true }) private dataForScoring!: StepForScoring;
  @Prop({ default: () => [] }) private exclude!: string[];

  get results(): Record<string, number> {
    return stableStepIds(this.$store).reduce((acc, stepId) => {
      acc[stepId] = this.dataForScoring
        ? getStepScore(rawStepsById(this.$store)[stepId], this.dataForScoring)
        : 0;

      return acc;
    }, {} as Record<string, number>);
  }

  get stepIdsByScore(): string[] {
    return sortBy(
      without(stableStepIds(this.$store), ...this.exclude),
      stepId => -this.results[stepId]
    );
  }

  render() {
    return this.$scopedSlots.default?.({
      results: this.results,
      stepIdsByScore: this.stepIdsByScore
    });
  }
}
