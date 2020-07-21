<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import Container from "@/components/Layout/Container.vue";
import { StepFormApi } from "@/components/StepForm/types";
import { RawStep } from "../../../../common/types/Step";
import "@/lib/stepsByHashDuplicateLocator";
import { ROUTES } from "@/router/routes";
import PureButton from "@/components/PureButton/PureButton.vue";
import { dispatchUpdateStep } from "@/store";
import { VueWithStore } from "@/lib/vueWithStore";

@Component({
  components: {
    Container,
    StepForm,
    PureButton
  }
})
export default class EditStep extends VueWithStore {
  @Ref("form") readonly form!: StepFormApi;

  async saveStep() {
    if (this.form.validate()) {
      await dispatchUpdateStep(this.$store, [this.step.id, this.form.value]);
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

  get step(): RawStep {
    return this.$store.state.steps.rawSteps.find(
      step => this.$route.params.stepId === step.id
    )!;
  }
}
</script>

<template>
  <Container>
    <StepForm
      ref="form"
      :existing-tags="steps.existingTags"
      :existing-artists="steps.existingArtists"
      :step="step"
    />

    <footer class="mt-8 text-right">
      <PureButton
        class="mr-2"
        @click.native="submitAndRedirect"
        kind="success"
        spacing="wide"
        size="large"
      >
        Save
      </PureButton>
    </footer>
  </Container>
</template>
