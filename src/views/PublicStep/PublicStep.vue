<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import StepProvider from "@/components/Providers/StepProvider.vue";
import { getCurrentStep } from "@/store";
import ReadonlyStep from "@/components/Step/ReadonlyStep.vue";
import Container from "@/components/Layout/Container.vue";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";

@Component({
  components: {
    Container,
    StepProvider,
    ReadonlyStep,
    BasicLoader
  }
})
export default class PublicStep extends VueWithStore {
  @Prop() private stepId!: string;

  get step() {
    return getCurrentStep(this.$store);
  }
}
</script>

<template>
  <StepProvider :step-id="stepId">
    <template #default>
      <Container>
        <ReadonlyStep :step="step" />
      </Container>
    </template>

    <template #loading>
      <BasicLoader />
    </template>
  </StepProvider>
</template>
