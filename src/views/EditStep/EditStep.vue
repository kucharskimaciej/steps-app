<script lang="ts">
import { Component, Ref, Watch } from "vue-property-decorator";
import StepForm from "@/features/CreateEditStep/StepForm/StepForm.vue";
import { StepFormApi } from "@/features/CreateEditStep/StepForm/types";
import { RawStep, Step } from "../../../common/types/Step";
import "@/lib/stepsByHashDuplicateLocator";
import { ROUTES } from "@/router/routes";
import PureButton from "@/components/PureButton/PureButton.vue";
import {
  dispatchUpdateStep,
  existingArtists,
  existingTags,
  getSteps,
  stepsById
} from "@/store";
import { VueWithStore } from "@/lib/vueWithStore";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import PureStepList from "@/components/StepList/PureStepList.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import ContentBox from "@/components/ContentBox/ContentBox.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import FullContent from "@/components/Step/FullContent.vue";
import Card from "@/components/Card/Card.vue";
import { sortBy, without } from "lodash";
import { getStepScore } from "@/lib/variations/variationStepScore";

@Component({
  components: {
    WideWithSidebarRight,
    StepForm,
    PureButton,
    VideoInput,
    PureStepList,
    AllStepsProvider,
    ContentBox,
    SelectToggleWidget,
    FullContent,
    Card
  }
})
export default class EditStep extends VueWithStore {
  @Ref("form") readonly form!: StepFormApi;
  selectedVariations: string[] = [];

  get step(): RawStep {
    return this.$store.state.steps.rawSteps.find(
      step => this.$route.params.stepId === step.id
    )!;
  }

  @Watch("step", { immediate: true })
  handleStepsLoaded() {
    if (this.step) {
      this.selectedVariations = this.step.variationKey
        ? [this.step.variationKey]
        : [];
    }
  }

  async saveStep() {
    if (this.form.validate()) {
      await dispatchUpdateStep(this.$store, {
        stepId: this.step.id,
        params: this.form.value,
        selectedVariations: this.selectedVariations
      });
    }
  }

  async submitAndRedirect() {
    try {
      await this.saveStep();
      await this.$router.push({ name: ROUTES.STEP_LIST });
    } catch (err) {
      console.error(err);
    }
  }

  toggleVariationSelected(stepId: string): void {
    const step = stepsById(this.$store)[stepId];
    if (!step) {
      return;
    }

    if (this.selectedVariations.includes(step.variationKey)) {
      this.selectedVariations = without(
        this.selectedVariations,
        step.variationKey
      );
    } else {
      this.selectedVariations.push(step.variationKey);
    }
  }

  isPartOfSelectedVariation(stepId: string): boolean {
    const step = stepsById(this.$store)[stepId];
    if (!step) {
      return false;
    }

    return this.selectedVariations.includes(step.variationKey);
  }

  get stepsByScore(): Step[] {
    const scoringResults = this.$store.state.steps.rawSteps.reduce(
      (acc, step) => {
        acc[step.id] = this.form?.value
          ? getStepScore(step, this.form.value)
          : 0;
        return acc;
      },
      {} as Record<string, number>
    );

    return sortBy(getSteps(this.$store), step => -scoringResults[step.id]);
  }

  get existingTags() {
    return existingTags(this.$store);
  }

  get existingArtists() {
    return existingArtists(this.$store);
  }
}
</script>

<template>
  <WideWithSidebarRight class="desktop:h-screen">
    <div class="h-full flex flex-col">
      <ContentBox class="border-r border-b text-right">
        <PureButton
          class="mr-2"
          kind="primary"
          spacing="wide"
          @click.native="submitAndRedirect"
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
