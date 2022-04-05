<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { Step } from "../../../../common/types/Step";

const Variations = defineComponent({
  props: {
    step: Object as PropType<Step>
  }
});

export default Variations;
</script>

<template>
  <div>
    <a
      v-for="variation in step.variations"
      :key="variation.id"
      :href="`#step-${variation.identifier}`"
      class="block"
    >
      <strong>#{{ variation.identifier }}</strong> {{ variation.name }}
    </a>
  </div>
</template>
