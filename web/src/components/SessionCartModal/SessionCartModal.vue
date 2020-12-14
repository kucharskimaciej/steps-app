<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import { stepsById } from "@/store";
import Feed from "@/components/Feed/Feed.vue";

@Component({
  components: {
    AllStepsProvider,
    Feed
  }
})
export default class SessionCartModal extends VueWithStore {
  get sessionSteps() {
    const steps = stepsById(this.$store);
    return this.$store.state.selectedSession.session!.steps.map(
      stepId => steps[stepId]
    );
  }
}
</script>

<template>
  <AllStepsProvider>
    <Feed :steps="sessionSteps" />
  </AllStepsProvider>
</template>
