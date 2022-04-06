<script lang="ts">
import { computed, defineComponent, onActivated } from "vue";
import { dispatchFetchCurrentStep, useStore } from "@/store";

const StepProvider = defineComponent({
  props: {
    stepId: {
      required: true,
      type: String,
    },
  },
  setup({ stepId }) {
    const store = useStore();
    const loading = computed(
      () => store.state.currentStep.status === "pending"
    );

    function loadStep() {
      return dispatchFetchCurrentStep(store, stepId);
    }

    onActivated(loadStep);

    return {
      loading,
    };
  },
});

export default StepProvider;
</script>

<template>
  <div>
    <slot v-if="loading" name="loading">
      <h1>Loading step</h1>
    </slot>
    <slot v-else />
  </div>
</template>
