<script lang="ts">
import { defineComponent, PropType } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

export type Positions = "topRight" | "topLeft";
export type Style = "default" | "filled";

const Close = defineComponent({
  components: { PureIcon },
  props: {
    iconPosition: {
      type: String as PropType<Positions>,
      default: "topLeft",
    },
    iconStyle: {
      type: String as PropType<Style>,
      default: "default",
    },
  },
  emits: [],
});

export default Close;
</script>

<template>
  <aside
    v-bind="$attrs"
    class="absolute top-0 m-2 desktop:m-4 text-3xl flex leading-none cursor-pointer"
    :class="{
      'right-0': iconPosition === 'topRight',
      'left-0': iconPosition === 'topLeft',
      'bg-white rounded-full': iconStyle === 'filled',
    }"
  >
    <PureIcon type="close" />
  </aside>
</template>
