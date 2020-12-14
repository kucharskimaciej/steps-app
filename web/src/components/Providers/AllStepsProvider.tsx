import { CreateElement } from "vue";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(h: CreateElement) {
    if (this.loading) {
      return this.$slots.loading || <div>Loading</div>;
    } else {
      return this.$slots.default;
    }
  }
}
