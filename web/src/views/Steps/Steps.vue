<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PureStepList from "@/components/StepList/PureStepList.vue";
import Container from "@/components/Layout/Container.vue";
import { getSteps } from "@/store";
import AllStepsProvider from "@/components/Providers/AllStepsProvider.vue";

@Component({
  components: {
    Container,
    PureStepList,
    AllStepsProvider
  }
})
export default class Steps extends Vue {
  get steps() {
    return getSteps(this.$store);
  }
}
</script>

<template>
  <Container>
    <AllStepsProvider>
      <PureStepList :steps="steps" />
    </AllStepsProvider>
  </Container>
</template>
