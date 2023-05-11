<script lang="ts">
import { defineComponent } from "vue";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import StepForm from "@/features/CreateEditStep/StepForm/StepForm.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import ContentBox from "@/components/ContentBox/ContentBox.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import FullContent from "@/components/Step/FullContent.vue";
import Card from "@/components/Card/Card.vue";
import {
  dispatchUpdateStep,
  existingArtists as getExistingArtists,
  existingTags as getExistingTags,
  getSteps,
  stepsById,
  useStore,
} from "@/store";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { StepFormApi } from "@/features/CreateEditStep/StepForm/types";
import { ROUTES } from "@/router";
import { sortBy, without } from "lodash";
import { getStepScore } from "@/lib/variations/variationStepScore";

const EditStep = defineComponent({
  components: {
    WideWithSidebarRight,
    StepForm,
    PureButton,
    AllStepsProvider,
    ContentBox,
    SelectToggleWidget,
    FullContent,
    Card,
  },
  emits: [],
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const selectedVariations = ref<string[]>([]);
    const form = ref<StepFormApi>();

    const step = computed(() => {
      return store.state.steps.rawSteps.find(
        (s) => route.params.stepId === s.id
      );
    });

    const existingTags = computed(() => getExistingTags(store));
    const existingArtists = computed(() => getExistingArtists(store));

    const stepsByScore = computed(() => {
      const scoringResults = store.state.steps.rawSteps.reduce((acc, step) => {
        acc[step.id] = form.value?.value
          ? getStepScore(step, form.value?.value)
          : 0;
        return acc;
      }, {} as Record<string, number>);

      return sortBy(getSteps(store), (step) => -scoringResults[step.id]);
    });

    watch(
      step,
      (newStep) => {
        if (newStep) {
          selectedVariations.value = newStep.variationKey
            ? [newStep.variationKey]
            : [];
        }
      },
      { immediate: true }
    );

    async function saveStep() {
      console.log("saving step", step.value);
      if (step.value && form.value && (await form.value.validate())) {
        console.log(form.value?.value);
        await dispatchUpdateStep(store, {
          stepId: step.value.id,
          params: form.value.value,
          selectedVariations: selectedVariations.value,
        });
      }
    }

    async function submitAndRedirect() {
      try {
        await saveStep();
        await router.push({ name: ROUTES.STEP_LIST });
      } catch (err) {
        console.error(err);
      }
    }

    function toggleVariationSelected(stepId: string): void {
      const step = stepsById(store)[stepId];
      if (!step) {
        return;
      }

      if (selectedVariations.value.includes(step.variationKey)) {
        selectedVariations.value = without(
          selectedVariations.value,
          step.variationKey
        );
      } else {
        selectedVariations.value.push(step.variationKey);
      }
    }

    function isPartOfSelectedVariation(stepId: string): boolean {
      const step = stepsById(store)[stepId];
      if (!step) {
        return false;
      }

      return selectedVariations.value.includes(step.variationKey);
    }

    return {
      step,
      existingTags,
      existingArtists,
      stepsByScore,
      submitAndRedirect,
      toggleVariationSelected,
      isPartOfSelectedVariation,
      saveStep,
      form,
    };
  },
});

export default EditStep;
</script>

<template>
  <WideWithSidebarRight class="desktop:h-screen">
    <div class="h-full flex flex-col">
      <ContentBox class="border-r border-b text-right">
        <PureButton
          class="mr-2"
          kind="primary"
          spacing="wide"
          @click="submitAndRedirect"
        >
          Save
        </PureButton>
      </ContentBox>

      <AllStepsProvider>
        <ContentBox class="border-r h-full flex-shrink">
          <StepForm
            ref="form"
            :step="step"
            :existing-tags="existingTags"
            :existing-artists="existingArtists"
          />
        </ContentBox>
      </AllStepsProvider>
    </div>

    <template #sidebar>
      <ContentBox :overflow="$match('desktop') ? 'scroll' : 'default'">
        <AllStepsProvider always-fetch>
          <div>
            <Card
              v-for="step in stepsByScore"
              :id="step.id"
              :key="step.id"
              class="mb-2"
            >
              <template #prefix>
                <SelectToggleWidget
                  :selected="isPartOfSelectedVariation(step.id)"
                  @toggle="toggleVariationSelected(step.id)"
                />
              </template>

              <FullContent :step="step" />
            </Card>
          </div>
        </AllStepsProvider>
      </ContentBox>
    </template>
  </WideWithSidebarRight>
</template>
