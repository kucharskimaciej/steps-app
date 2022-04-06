import {
  getStepScore,
  StepForScoring,
} from "@/lib/variations/variationStepScore";
import { rawStepsById, stableStepIds, useStore } from "@/store";
import { sortBy, without } from "lodash";
import { computed, defineComponent, PropType } from "vue";

const ProvideScoring = defineComponent({
  props: {
    dataForScoring: {
      type: Object as PropType<StepForScoring>,
      required: true,
    },
    exclude: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup({ dataForScoring, exclude }, { slots }) {
    const store = useStore();

    const results = computed<Record<string, number>>(() => {
      return stableStepIds(store).reduce((acc, stepId) => {
        acc[stepId] = dataForScoring
          ? getStepScore(rawStepsById(store)[stepId], dataForScoring)
          : 0;

        return acc;
      }, {} as Record<string, number>);
    });

    const stepIdsByScore = computed<string[]>(() =>
      sortBy(
        without(stableStepIds(store), ...exclude),
        (stepId) => -results.value[stepId]
      )
    );

    return () => {
      return slots.default?.({
        results: results.value,
        stepIdsByScore: stepIdsByScore.value,
      });
    };
  },
});

export default ProvideScoring;
