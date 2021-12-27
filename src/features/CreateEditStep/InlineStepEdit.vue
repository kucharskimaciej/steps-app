<script lang="ts">
import Card from "@/components/Card/Card.vue";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import FullContent from "@/components/Step/FullContent.vue";
import { StepFormApi } from "@/features/CreateEditStep/StepForm/types";
import { DebounceTime } from "@/lib/decorators/debouceTime";
import { getStepScore } from "@/lib/variations/variationStepScore";
import { VueWithStore } from "@/lib/vueWithStore";
import { sortBy, without } from "lodash";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { RawStep } from "../../../common/types/Step";
import {
  dispatchUpdateStep,
  existingArtists,
  existingTags,
  rawStepsById,
  stableStepIds,
  stepsById
} from "@/store";
import StepForm from "@/features/CreateEditStep/StepForm/StepForm.vue";

@Component({
  components: {
    StepForm,
    WideWithSidebarRight,
    PureButton,
    SelectToggleWidget,
    Card,
    FullContent
  }
})
export default class InlineStepEdit extends VueWithStore {
  @Prop({ required: true }) private step!: RawStep;
  @Ref("form") readonly form!: StepFormApi;

  selectedVariations: string[] = [];
  stepIdsByScore: string[] = [];

  @Watch("step", { immediate: true })
  handleStepsLoaded() {
    if (this.step) {
      this.selectedVariations = this.step.variationKey
        ? [this.step.variationKey]
        : [];
    }
  }

  @Watch("form.value", { immediate: true })
  @Watch("step.variationKey")
  @DebounceTime(200)
  handleFormValueChanged() {
    if (this.form?.value) {
      const scoringResults = stableStepIds(this.$store).reduce(
        (acc, stepId) => {
          acc[stepId] = this.form?.value
            ? getStepScore(rawStepsById(this.$store)[stepId], this.form.value)
            : 0;
          return acc;
        },
        {} as Record<string, number>
      );

      this.stepIdsByScore = sortBy(
        without(stableStepIds(this.$store), this.step.id),
        stepId => -scoringResults[stepId]
      ).slice(0, 20);
    } else {
      this.stepIdsByScore = [];
    }
  }

  get stepsById() {
    return stepsById(this.$store);
  }

  get existingTags() {
    return existingTags(this.$store);
  }

  get existingArtists() {
    return existingArtists(this.$store);
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

  async saveStep() {
    if (this.form.validate()) {
      await dispatchUpdateStep(this.$store, {
        stepId: this.step.id,
        params: this.form.value,
        selectedVariations: this.selectedVariations
      });
    }
  }
}
</script>

<template>
  <section class="h-full flex flex-col gap-4">
    <header class="p-4 text-right">
      <PureButton kind="primary" spacing="wide" @click.native="saveStep">
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
      />

      <template #sidebar>
        <section class="h-full overflow-y-auto mr-4">
          <Card
            v-for="stepId in stepIdsByScore"
            :id="stepId"
            :key="stepId"
            class="mb-2"
          >
            <template #prefix>
              <SelectToggleWidget
                :selected="isPartOfSelectedVariation(stepId)"
                @toggle="toggleVariationSelected(stepId)"
              />
            </template>
            <FullContent :step="stepsById[stepId]" />
          </Card>
        </section>
      </template>
    </WideWithSidebarRight>
  </section>
</template>
