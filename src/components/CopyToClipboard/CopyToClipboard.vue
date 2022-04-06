<script lang="ts">
import { defineComponent } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const CopyTyClipboard = defineComponent({
  components: {
    PureIcon,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup({ value }) {
    function copy() {
      navigator.clipboard.writeText(value);
    }

    return {
      copy,
    };
  },
});

export default CopyTyClipboard;
</script>

<template>
  <span class="cursor-pointer" @click="copy()">
    <slot></slot>
  </span>
</template>
