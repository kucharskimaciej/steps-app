<script lang="ts">
import { defineComponent } from "vue";

const CopyTyClipboard = defineComponent({
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(props) {
    function copy() {
      navigator.clipboard.writeText(props.value);
    }

    return {
      copy
    };
  }
});

export default CopyTyClipboard;
</script>

<template>
  <span class="cursor-pointer" @click="copy()">
    <slot></slot>
  </span>
</template>
