<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchFetchCurrentStep } from "@/store";

@Component
export default class StepProvider extends VueWithStore {
  @Prop({ required: true }) private stepId!: string;

  @Watch("stepId")
  onStepIdChanged(newValue: string, oldValue: string) {
    if (newValue && newValue !== oldValue) {
      this.loadStep(newValue);
    }
  }

  get loading() {
    return this.$store.state.currentStep.status === "pending";
  }

  async loadStep(stepId: string) {
    if (this.loading) {
      return;
    }

    await dispatchFetchCurrentStep(this.$store, stepId);
  }

  async created() {
    await this.loadStep(this.stepId);
  }
}
</script>

<template>
  <div>
    <slot v-if="loading" name="loading">
      <h1>Loading step</h1>
    </slot>
    <slot v-else />
  </div>
</template>
