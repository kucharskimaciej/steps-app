<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import StepForm from "@/features/CreateEditStep/StepForm/StepForm.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import ContentBox from "@/components/ContentBox/ContentBox.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import FullContent from "@/components/Step/FullContent.vue";
import Card from "@/components/Card/Card.vue";
import {
  PersistentFormData,
  StepFormApi,
  StepFormData,
} from "@/features/CreateEditStep/StepForm/types";
import {
  dispatchCreateStep,
  existingArtists as getExistingArtists,
  existingTags as getExistingTags,
  getSteps,
  nextIdentifier,
  stepsById,
  useStore,
} from "@/store";
import { ROUTES } from "@/router";
import { useRouter } from "vue-router";
import { sortBy, without } from "lodash";
import { getStepScore } from "@/lib/variations/variationStepScore";

function getPersistentValue({
  feeling,
  artists,
  tags,
  difficulty,
}: StepFormData): PersistentFormData {
  return { feeling, artists, tags, difficulty };
}

const CreateStep = defineComponent({
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
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = ref<StepFormApi>();
    const selectedVariations = ref<string[]>([]);

    const existingTags = computed(() => getExistingTags(store));
    const existingArtists = computed(() => getExistingArtists(store));
    const stepsByScore = computed(() => {
      const scoringResults = store.state.steps.rawSteps.reduce((acc, step) => {
        acc[step.id] = form.value?.value
          ? getStepScore(step, form.value.value)
          : 0;
        return acc;
      }, {} as Record<string, number>);

      return sortBy(getSteps(store), (step) => -scoringResults[step.id]);
    });

    async function saveStep() {
      if (!form.value) {
        return;
      }

      console.log("create step #saveStep", {
        ...form.value?.getValue(),
        owner_uid: store.state.auth.uid,
        identifier: nextIdentifier(store),
      });

      // await dispatchCreateStep(store, {
      //   params: {
      //     ...form.value?.getValue(),
      //     owner_uid: store.state.auth.uid,
      //     identifier: nextIdentifier(store),
      //   },
      //   selectedVariations: selectedVariations.value,
      // });
    }

    function reset(value?: Partial<StepFormData>) {
      form.value?.reset(value);
      selectedVariations.value = [];
    }

    async function submitAndRedirect() {
      try {
        if (await form.value?.validate()) {
          await saveStep();
          // await router.push({ name: ROUTES.STEP_LIST });
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function submitAndClear() {
      try {
        if (form.value?.getValue() && (await form.value?.validate())) {
          await saveStep();
          reset(getPersistentValue(form.value?.getValue()));
        }
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
      existingTags,
      existingArtists,
      stepsByScore,
      submitAndRedirect,
      submitAndClear,
      toggleVariationSelected,
      isPartOfSelectedVariation,
      saveStep,
      form,
    };
  },
});

export default CreateStep;
</script>

<template>
  <WideWithSidebarRight class="desktop:h-screen">
    <div class="flex flex-col h-full">
      <ContentBox class="border-r border-b text-right">
        <PureButton
          class="mr-2"
          spacing="wide"
          kind="secondary"
          @click="submitAndRedirect"
        >
          Save
        </PureButton>

        <PureButton kind="primary" spacing="wide" @click="submitAndClear">
          Save &amp; create another
        </PureButton>
      </ContentBox>

      <ContentBox class="border-r h-full flex-shrink">
        <StepForm
          ref="form"
          :existing-tags="existingTags"
          :existing-artists="existingArtists"
        />
      </ContentBox>
    </div>

    <template #sidebar>
      <ContentBox
        :overflow="$match('desktop') ? 'scroll' : 'default'"
        class="h-screen"
      >
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
