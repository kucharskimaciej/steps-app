<script lang="ts">
import { defineComponent, provide } from "@vue/composition-api";

const PopupControlWrapper = defineComponent({
  setup(_, ctx) {
    function onItemClick() {
      ctx.emit("item-clicked");
    }

    provide("onItemClick", onItemClick);
  }
});

export default PopupControlWrapper;
</script>

<template>
  <section><slot></slot></section>
</template>
