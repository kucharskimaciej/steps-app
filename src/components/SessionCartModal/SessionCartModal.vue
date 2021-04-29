<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import { stepsById } from "@/store";
import Feed from "@/components/Feed/Feed.vue";
import RecordPracticeWidget from "@/components/RecordPracticeWidget/RecordPracticeWidget.vue";

@Component({
  components: {
    AllStepsProvider,
    Feed,
    RecordPracticeWidget
  }
})
export default class SessionCartModal extends VueWithStore {
  get sessionSteps() {
    const steps = stepsById(this.$store);
    if (this.$store.state.selectedSession.session) {
      return this.$store.state.selectedSession.session.steps.map(
        stepId => steps[stepId]
      );
    } else {
      return [];
    }
  }

  get selectedSessionId(): string {
    if (!this.$store.state.selectedSession.session) {
      return "";
    }
    return this.$store.state.selectedSession.session.id;
  }
}
</script>

<template>
  <AllStepsProvider>
    <Feed :steps="sessionSteps">
      <template #stepActions="{ step }">
        <RecordPracticeWidget
          :step-id="step.id"
          :collection-id="selectedSessionId"
        />
      </template>
    </Feed>
  </AllStepsProvider>
</template>
