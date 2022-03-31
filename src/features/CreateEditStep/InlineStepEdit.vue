<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch
} from "@vue/composition-api";
import StepForm from "@/features/CreateEditStep/StepForm/StepForm.vue";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import Card from "@/components/Card/Card.vue";
import FullContent from "@/components/Step/FullContent.vue";
import ProvideScoring from "@/features/CreateEditStep/ProvideScoring";
import { StepDTO } from "../../../common/types/Step";
import { StepFormApi } from "@/features/CreateEditStep/StepForm/types";
import {
  stepsById as getStepsById,
  existingArtists as getExistingArtists,
  existingTags as getExistingTags,
  useStore,
  dispatchUpdateStep
} from "@/store";
import { without } from "lodash";

const InlineStepEdit = defineComponent({
  components: {
    StepForm,
    WideWithSidebarRight,
    PureButton,
    SelectToggleWidget,
    Card,
    FullContent,
    ProvideScoring
  },
  props: {
    step: {
      type: Object as PropType<StepDTO>,
      required: true
    }
  },
  emits: ["finished"],
  setup({ step }, ctx) {
    const store = useStore();

    const selectedVariations = ref<string[]>([]);
    const form = ref<StepFormApi>();

    watch(step, newStep => {
      if (newStep) {
        selectedVariations.value = newStep.variationKey
          ? [newStep.variationKey]
          : [];
      }
    });

    const stepsById = computed(() => getStepsById(store));
    const existingArtists = computed(() => getExistingArtists(store));
    const existingTags = computed(() => getExistingTags(store));

    function isPartOfSelectedVariation(stepId: string) {
      const stepToCheck = stepsById.value[stepId];

      if (!stepToCheck) {
        return false;
      }

      return selectedVariations.value.includes(stepToCheck.variationKey);
    }

    function toggleVariationSelected(stepId: string): void {
      const stepToToggle = stepsById.value[stepId];
      if (!stepToToggle) {
        return;
      }

      if (selectedVariations.value.includes(stepToToggle.variationKey)) {
        selectedVariations.value = without(
          selectedVariations.value,
          stepToToggle.variationKey
        );
      } else {
        selectedVariations.value.push(stepToToggle.variationKey);
      }
    }

    async function saveStep() {
      if (!form.value) {
        return;
      }

      if (form.value.validate()) {
        await dispatchUpdateStep(store, {
          stepId: step.id,
          params: form.value.value,
          selectedVariations: selectedVariations.value
        });

        ctx.emit("finished");
      }
    }

    return {
      form,
      stepsById,
      existingArtists,
      existingTags,
      isPartOfSelectedVariation,
      toggleVariationSelected,
      saveStep
    };
  }
});

export default InlineStepEdit;
</script>

<template>
  <section class="h-full flex flex-col gap-4">
    <header class="p-4 text-right">
      <PureButton kind="primary" spacing="wide" @click.native="saveStep()">
        Save
      </PureButton>
    </header>

    <WideWithSidebarRight class="h-full gap-4 mb-4 overflow-hidden">
      <StepForm
        ref="form"
        class="pl-4"
        :step="step"
        :existing-tags="existingTags"
        :existing-artists="existingArtists"
        @input="form.value = $event"
      />

      <template #sidebar>
        <ProvideScoring
          v-if="form"
          :exclude="[step.id]"
          :data-for-scoring="form.value"
          class="h-full overflow-y-auto mr-4"
        >
          <template #default="{ stepIdsByScore, results }">
            <div>
              <Card
                v-for="stepId in stepIdsByScore.slice(0, 20)"
                :id="stepId"
                :key="stepId"
                class="mb-2"
              >
                <template #prefix>
                  <div class="text-2xs bg-mono-600 mb-2 p-1 text-center">
                    {{ results[stepId] }}
                  </div>
                  <SelectToggleWidget
                    :selected="isPartOfSelectedVariation(stepId)"
                    @toggle="toggleVariationSelected(stepId)"
                  />
                </template>
                <FullContent :step="stepsById[stepId]" />
              </Card>
            </div>
          </template>
        </ProvideScoring>
      </template>
    </WideWithSidebarRight>
  </section>
</template>
