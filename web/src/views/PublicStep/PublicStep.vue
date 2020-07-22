<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import StepProvider from "@/components/Providers/StepProvider.vue";
import { getCurrentStep } from "@/store";

@Component({
  components: {
    StepProvider
  }
})
export default class PublicStep extends VueWithStore {
  @Prop() private stepId!: string;

  get step() {
    return getCurrentStep(this.$store)!;
  }
}
</script>

<template>
  <StepProvider :step-id="stepId">
    <template #default>
      <p>hello, public {{ step.name }}</p>
    </template>
  </StepProvider>
</template>
