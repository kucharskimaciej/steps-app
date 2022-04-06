<script lang="ts">
import { computed, defineComponent } from "vue";
import Container from "@/components/Layout/Container.vue";
import PureStepList from "@/components/StepList/PureStepList.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import { getSteps, useStore } from "@/store";

const StepsView = defineComponent({
  components: {
    Container,
    PureStepList,
    AllStepsProvider,
  },
  setup() {
    const store = useStore();
    const steps = computed(() => getSteps(store));

    return {
      steps,
    };
  },
});

export default StepsView;
</script>

<template>
  <Container>
    <AllStepsProvider always-fetch>
      <PureStepList :steps="steps" />
    </AllStepsProvider>
  </Container>
</template>
