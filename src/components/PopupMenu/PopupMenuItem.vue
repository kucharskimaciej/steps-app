<script lang="ts">
import { defineComponent, inject } from "@vue/composition-api";

const PopupMenuItem = defineComponent({
  setup(_, ctx) {
    const onItemClick: (() => void) | undefined = inject("onItemClick");

    function handleItemClick() {
      onItemClick?.();
      ctx.emit("click");
    }

    return {
      handleItemClick
    };
  }
});

export default PopupMenuItem;
</script>

<template>
  <div
    class="px-4 py-2 text-center cursor-pointer border-b border-mono-800 text-sm font-semibold text-mono-200 hover:bg-mono-800"
    @click="handleItemClick()"
  >
    <slot></slot>
  </div>
</template>
