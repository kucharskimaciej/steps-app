<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import { StepFormApi } from "@/components/StepForm/types";
import PureButton from "@/components/PureButton/PureButton.vue";
import "@/lib/rawStepHelpers";
import { ROUTES } from "@/router/routes";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import "@/lib/stepsByHashDuplicateLocator";
import "@/lib/videoUpload.service";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import PureStepList from "@/components/StepList/PureStepList.vue";
import { without, sortBy } from "lodash";
import { Step } from "../../../../common/types/Step";
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

@Component({
  components: {
    WideWithSidebarRight,
    StepForm,
    PureButton,
    VideoInput,
    PureStepList,
    AllStepsProvider
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
        this.reset();
      }
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

  reset() {
    this.form.reset();
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
  <WideWithSidebarRight class="max-h-screen">
    <StepForm
      :existing-tags="existingTags"
      :existing-artists="existingArtists"
      ref="form"
    />
    <footer class="mt-8 text-right">
      <PureButton
        class="mr-2"
        @click.native="submitAndRedirect"
        kind="success"
        spacing="wide"
        size="large"
        feel="ghost"
      >
        Save
      </PureButton>

      <PureButton
        @click.native="submitAndClear"
        kind="success"
        spacing="wide"
        size="large"
      >
        Save &amp; create another
      </PureButton>
    </footer>

    <template #sidebar>
      <AllStepsProvider>
        <PureStepList
          :steps="stepsByScore"
          :is-selected="isPartOfSelectedVariation"
          class="max-h-full"
          @select="toggleVariationSelected"
        />
      </AllStepsProvider>
    </template>
  </WideWithSidebarRight>
</template>
