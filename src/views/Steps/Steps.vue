<script lang="ts">
import { computed, defineComponent } from "vue";
import Container from "@/components/Layout/Container.vue";
import PureStepList from "@/components/StepList/PureStepList.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import { getSteps, useStore } from "@/store";

const Steps = defineComponent({
  components: {
    Container,
    PureStepList,
    AllStepsProvider
  },
  setup() {
    const store = useStore();
    const steps = computed(() => {
      console.log("rerun");
      return getSteps(store);
    });

    return {
      steps
    };
  }
});

export default Steps;
</script>

<template>
  <Container>
    <AllStepsProvider always-fetch>
      <PureStepList :steps="steps" />
    </AllStepsProvider>
  </Container>
</template>
