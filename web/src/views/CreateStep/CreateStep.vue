<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import Container from "@/components/Layout/Container.vue";
import { StepFormApi } from "@/components/StepForm/types";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { AuthModule } from "@/store/modules/auth";
import PureButton from "@/components/PureButton/PureButton.vue";
import "@/lib/stepsByUrlDuplicateLocator";
import { ROUTES } from "@/routes";

@Component({
  components: {
    Container,
    StepForm,
    PureButton
  }
})
export default class CreateStep extends Vue {
  @Ref("form") readonly form!: StepFormApi;

  private steps = getModule(StepsModule, this.$store);
  private auth = getModule(AuthModule, this.$store);

  async saveStep() {
    if (this.form.validate()) {
      await this.steps.createStep({
        ...this.form.value,
        owner_uid: this.auth.uid,
        identifier: this.steps.nextIdentifier
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

  async submitAndClear() {
    try {
      await this.saveStep();
      this.form.reset();
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<template>
  <Container>
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
  </Container>
</template>
