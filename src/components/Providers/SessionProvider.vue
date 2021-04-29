<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchFetchSession } from "@/store/modules/selectedSession";

@Component
export default class SessionProvider extends VueWithStore {
  @Prop({ required: true }) private id!: string;

  @Watch("id")
  onStepIdChanged(newValue: string, oldValue: string) {
    if (newValue && newValue !== oldValue) {
      this.load(newValue);
    }
  }

  get loading() {
    return this.$store.state.selectedSession.status === "pending";
  }

  get session() {
    return this.$store.state.selectedSession.session;
  }

  async load(id: string) {
    if (this.loading) {
      return;
    }

    await dispatchFetchSession(this.$store, id);
  }

  async created() {
    await this.load(this.id);
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
