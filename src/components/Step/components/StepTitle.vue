<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { Step } from "../../../../common/types/Step";

const StepTitle = defineComponent({
  components: {},
  props: {
    step: Object as PropType<Step>,
    linkToVideo: Boolean
  }
});

export default StepTitle;
</script>

<template>
  <h5 class="font-heading font-normal leading-tight">
    <aside class="mr-1 inline font-bold">#{{ step.identifier }}</aside>

    <span
      :class="{
        'focus:outline-none focus:bg-yellow-base cursor-pointer': linkToVideo
      }"
      >{{ step.name }}</span
    >
  </h5>
</template>
