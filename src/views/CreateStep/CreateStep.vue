<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import {
  PersistentFormData,
  StepFormApi,
  StepFormData
} from "@/components/StepForm/types";
import PureButton from "@/components/PureButton/PureButton.vue";
import "@/lib/rawStepHelpers";
import { ROUTES } from "@/router/routes";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import "@/lib/stepsByHashDuplicateLocator";
import "@/lib/videoUpload.service";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import PureStepList from "@/components/StepList/PureStepList.vue";
import { without, sortBy } from "lodash";
import { Step } from "../../../common/types/Step";
import { getStepScore } from "@/lib/variations/variationStepScore";
import {
  dispatchCreateStep,
  existingTags,
  existingArtists,
  getSteps,
  nextIdentifier,
  stepsById
} from "@/store";
import { VueWithStore } from "@/lib/vueWithStore";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import ContentBox from "@/components/ContentBox/ContentBox.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import FullContent from "@/components/Step/FullContent.vue";
import Card from "@/components/Card/Card.vue";

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
export default class CreateStep extends VueWithStore {
  @Ref("form") readonly form!: StepFormApi;
  selectedVariations: string[] = [];

  async saveStep() {
    await dispatchCreateStep(this.$store, {
      params: {
        ...this.form.value,
        owner_uid: this.$store.state.auth.uid,
        identifier: nextIdentifier(this.$store)
      },
      selectedVariations: this.selectedVariations
    });
  }

  async submitAndRedirect() {
    try {
      if (this.form.validate()) {
        await this.saveStep();
        await this.$router.push({ name: ROUTES.STEP_LIST });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async submitAndClear() {
    try {
      if (this.form.validate()) {
        await this.saveStep();
        this.reset(CreateStep.getPersistentValue(this.form.value));
      }
    } catch (err) {
      console.error(err);
    }
  }

  static getPersistentValue({
    feeling,
    kind,
    artists,
    tags,
    difficulty
  }: StepFormData): PersistentFormData {
    return { feeling, kind, artists, tags, difficulty };
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

  reset(value?: Partial<StepFormData>) {
    this.form.reset(value);
    this.selectedVariations = [];
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
    <div class="flex flex-col h-full">
      <ContentBox class="border-r border-b text-right">
        <PureButton
          class="mr-2"
          kind="success"
          spacing="wide"
          feel="ghost"
          @click.native="submitAndRedirect"
        >
          Save
        </PureButton>

        <PureButton
          kind="success"
          spacing="wide"
          @click.native="submitAndClear"
        >
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
