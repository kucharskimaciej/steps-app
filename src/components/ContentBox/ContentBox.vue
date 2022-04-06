<script lang="ts">
import { defineComponent, PropType } from "vue";

type Overflow = "default" | "hidden" | "scroll";

const ContentBox = defineComponent({
  props: {
    overflow: {
      type: String as PropType<Overflow>,
      default: "default",
    },
  },
});

export default ContentBox;
</script>

<template>
  <div
    class="p-4 border-gray-300"
    :class="{
      'overflow-y-hidden': overflow === 'hidden',
      'overflow-y-auto': overflow === 'scroll',
    }"
  >
    <div>
      <slot />
    </div>
  </div>
</template>
