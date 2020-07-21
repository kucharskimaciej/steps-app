<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchFetchAllSteps } from "@/store";

@Component
export default class AllStepsProvider extends VueWithStore {
  get loading() {
    return this.$store.state.steps.status === "pending";
  }

  async loadSteps() {
    if (this.$store.state.steps.status !== "clean") {
      return;
    }

    await dispatchFetchAllSteps(this.$store);
  }

  async created() {
    await this.loadSteps();
  }
}
</script>

<template>
  <div>
    <slot v-if="loading" name="loading">
      <h1>Loading steps</h1>
    </slot>
    <slot v-else />
  </div>
</template>
