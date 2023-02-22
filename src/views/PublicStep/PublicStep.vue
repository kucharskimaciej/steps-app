<script lang="ts">
import { computed, defineComponent } from "vue";
import Container from "@/components/Layout/Container.vue";
import StepProvider from "@/components/Providers/StepProvider.vue";
import ReadonlyStep from "@/components/Step/ReadonlyStep.vue";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";
import { getCurrentStep, useStore } from "@/store";

const PublicStep = defineComponent({
  components: {
    Container,
    StepProvider,
    ReadonlyStep,
    BasicLoader,
  },
  props: {
    stepId: String,
  },
  setup() {
    const store = useStore();
    const step = computed(() => getCurrentStep(store));

    return {
      step,
    };
  },
});

export default PublicStep;
</script>

<template>
  <StepProvider :step-id="stepId">
    <template #default>
      <Container>
        <ReadonlyStep :step="step" v-if="step" />
      </Container>
    </template>

    <template #loading>
      <BasicLoader />
    </template>
  </StepProvider>
</template>
