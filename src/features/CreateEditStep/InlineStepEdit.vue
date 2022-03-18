<script lang="ts">
import Card from "@/components/Card/Card.vue";
import WideWithSidebarRight from "@/components/Layout/WideWithSidebarRight.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";
import FullContent from "@/components/Step/FullContent.vue";
import ProvideScoring from "@/features/CreateEditStep/ProvideScoring";
import {
  StepFormApi,
  StepFormData
} from "@/features/CreateEditStep/StepForm/types";
import { VueWithStore } from "@/lib/vueWithStore";
import { without } from "lodash";
import { Component, Prop, Ref, Watch } from "vue-property-decorator";
import { StepDTO } from "../../../common/types/Step";
import {
  dispatchUpdateStep,
  existingArtists,
  existingTags,
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
    FullContent,
    ProvideScoring
  }
})
export default class InlineStepEdit extends VueWithStore {
  @Prop({ required: true }) private step!: StepDTO;
  @Ref("form") readonly form!: StepFormApi;

  selectedVariations: string[] = [];
  value: Partial<StepFormData> = {};

  @Watch("step", { immediate: true })
  handleStepsLoaded() {
    if (this.step) {
      this.selectedVariations = this.step.variationKey
        ? [this.step.variationKey]
        : [];
    }
  }

  get formValue() {
    return this.value;
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

      this.$emit("finished");
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
        @input="value = $event"
      />

      <template #sidebar>
        <ProvideScoring
          :exclude="[step.id]"
          :data-for-scoring="formValue"
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
