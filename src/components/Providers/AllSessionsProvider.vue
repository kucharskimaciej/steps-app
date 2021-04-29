<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchFetchAllSessions } from "@/store";

@Component
export default class AllSessionsProvider extends VueWithStore {
  @Prop() private alwaysFetch!: boolean;

  get loading() {
    return this.$store.state.practiceSessions.status === "pending";
  }

  async load() {
    if (
      !this.alwaysFetch &&
      this.$store.state.practiceSessions.status !== "clean"
    ) {
      return;
    }

    await dispatchFetchAllSessions(this.$store);
  }

  async created() {
    await this.load();
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
