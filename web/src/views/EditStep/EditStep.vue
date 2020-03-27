<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import Container from "@/components/Layout/Container.vue";
import { StepFormData } from "@/components/StepForm/types";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { RawStep } from "../../../../common/types/Step";
import "@/lib/stepsByUrlDuplicateLocator";

@Component({
  components: {
    Container,
    StepForm
  }
})
export default class EditStep extends Vue {
  private steps = getModule(StepsModule, this.$store);

  async handleSaveStep(data: StepFormData) {
    try {
      await this.steps.updateStep([this.step.id, data]);
      await this.$router.back();
    } catch (err) {
      console.error(err);
    }
  }

  get step(): RawStep {
    return this.steps.rawSteps.find(
      step => this.$route.params.stepId === step.id
    )!;
  }
}
</script>

<template>
  <Container>
    <StepForm
      @save-step="handleSaveStep"
      :existing-tags="steps.existingTags"
      :existing-artists="steps.existingArtists"
      :step="step"
    />
  </Container>
</template>
