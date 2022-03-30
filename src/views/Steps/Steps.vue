<script lang="ts">
import { Component } from "vue-property-decorator";
import PureStepList from "@/components/StepList/PureStepList.vue";
import Container from "@/components/Layout/Container.vue";
import { getSteps } from "@/store";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import { VueWithStore } from "@/lib/vueWithStore";

@Component({
  components: {
    Container,
    PureStepList,
    AllStepsProvider
  }
})
export default class Steps extends VueWithStore {
  get steps() {
    return getSteps(this.$store);
  }
}
</script>

<template>
  <Container>
    <AllStepsProvider always-fetch>
      <PureStepList :steps="steps" />
    </AllStepsProvider>
  </Container>
</template>
