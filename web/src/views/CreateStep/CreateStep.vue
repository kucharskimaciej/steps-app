<script lang="ts">
import { Vue, Component, Ref } from "vue-property-decorator";
import StepForm from "@/components/StepForm/StepForm.vue";
import Container from "@/components/Layout/Container.vue";
import { StepFormApi, StepFormData } from "@/components/StepForm/types";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { AuthModule } from "@/store/modules/auth";
import "@/lib/stepsByUrlDuplicateLocator";

@Component({
  components: {
    Container,
    StepForm
  }
})
export default class CreateStep extends Vue {
  @Ref("form") readonly form!: StepFormApi;

  private steps = getModule(StepsModule, this.$store);
  private auth = getModule(AuthModule, this.$store);

  async handleSaveStep(data: StepFormData) {
    try {
      await this.steps.createStep({
        ...data,
        owner_uid: this.auth.uid,
        identifier: this.steps.nextIdentifier
      });

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
      @save-step="handleSaveStep"
      :existing-tags="steps.existingTags"
      ref="form"
    />
  </Container>
</template>
