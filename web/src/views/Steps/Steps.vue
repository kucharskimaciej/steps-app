<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PureStepList from "@/components/StepList/PureStepList.vue";
import Container from "@/components/Layout/Container.vue";
import { dispatchToggleStepPractice, getSteps, practiceSteps } from "@/store";

@Component({
  components: {
    Container,
    PureStepList
  }
})
export default class Steps extends Vue {
  isSelected = (stepId: string) => stepId in practiceSteps(this.$store);

  async handleStepSelected(stepId: string) {
    await dispatchToggleStepPractice(this.$store, stepId);
  }

  get steps() {
    return getSteps(this.$store);
  }
}
</script>

<template>
  <Container>
    <PureStepList
      :steps="steps"
      :is-selected="isSelected"
      @select="handleStepSelected"
    />
  </Container>
</template>
