<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchFetchAllSessions } from "@/store";

@Component
export default class AllSessionsProvider extends VueWithStore {
  get loading() {
    return this.$store.state.practiceSessions.status === "pending";
  }

  async loadSteps() {
    if (this.$store.state.practiceSessions.status !== "clean") {
      return;
    }

    await dispatchFetchAllSessions(this.$store);
  }

  async created() {
    await this.loadSteps();
  }
}
</script>

<template>
  <div>
    <slot v-if="loading" name="loading">
      <h1>Loading sessions</h1>
    </slot>
    <slot v-else />
  </div>
</template>
