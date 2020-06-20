<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import Container from "@/components/Layout/Container.vue";
import { StepFormApi } from "@/components/StepForm/types";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { RawStep } from "../../../../common/types/Step";
import "@/lib/stepsByHashDuplicateLocator";
import { ROUTES } from "@/routes";
import PureButton from "@/components/PureButton/PureButton.vue";

@Component({
  components: {
    Container,
    StepForm,
    PureButton
  }
})
export default class EditStep extends Vue {
  @Ref("form") readonly form!: StepFormApi;
  private steps = getModule(StepsModule, this.$store);

  async saveStep() {
    if (this.form.validate()) {
      await this.steps.updateStep([this.step.id, this.form.value]);
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
    return this.steps.rawSteps.find(
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
