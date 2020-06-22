<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import { StepFormApi } from "@/components/StepForm/types";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { AuthModule } from "@/store/modules/auth";
import PureButton from "@/components/PureButton/PureButton.vue";
import "@/lib/rawStepHelpers";
import { ROUTES } from "@/routes";
import VideoInput from "@/components/Forms/VideoInput/VideoInput.vue";
import { CurrentUserModule } from "@/store/modules/currentUser";
import "@/lib/stepsByHashDuplicateLocator";
import "@/lib/videoUpload.service";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import PureStepList from "@/components/StepList/PureStepList.vue";
import { without, sortBy } from "lodash";
import { Step } from "../../../../common/types/Step";
import { getStepScore } from "@/lib/variations/variationStepScore";

@Component({
  components: {
    WideWithSidebarRight,
    StepForm,
    PureButton,
    VideoInput,
    PureStepList
  }
})
export default class CreateStep extends Vue {
  @Ref("form") readonly form!: StepFormApi;

  private steps = getModule(StepsModule, this.$store);
  private auth = getModule(AuthModule, this.$store);
  currentUser = getModule(CurrentUserModule, this.$store);
  selectedVariations: string[] = [];

  async saveStep() {
    await this.steps.createStep({
      params: {
        ...this.form.value,
        owner_uid: this.auth.uid,
        identifier: this.steps.nextIdentifier
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
    const step = this.steps.stepsById[stepId];
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
    const step = this.steps.stepsById[stepId];
    if (!step) {
      return false;
    }

    return this.selectedVariations.includes(step.variationKey);
  }

  get stepsByScore(): Step[] {
    const scoringResults = this.steps.rawSteps.reduce((acc, step) => {
      acc[step.id] = this.form?.value ? getStepScore(step, this.form.value) : 0;
      return acc;
    }, {} as Record<string, number>);

    return sortBy(this.steps.steps, step => -scoringResults[step.id]);
  }

  reset() {
    this.form.reset();
    this.selectedVariations = [];
  }
}
</script>

<template>
  <WideWithSidebarRight class="max-h-screen">
    <StepForm
      :existing-tags="steps.existingTags"
      :existing-artists="steps.existingArtists"
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
      <PureStepList
        :steps="stepsByScore"
        :is-selected="isPartOfSelectedVariation"
        class="max-h-full"
        @select="toggleVariationSelected"
      />
    </template>
  </WideWithSidebarRight>
</template>
