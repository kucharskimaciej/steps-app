<script lang="ts">
import { defineComponent, inject } from "vue";
import TheTopBar from "@/components/TheTopBar/TheTopBar.vue";
import { uiContextKey } from "@/uiContext";

const TheTopBarContainer = defineComponent({
  components: {
    TheTopBar,
  },
  setup() {
    const state = inject(uiContextKey);

    return {
      toggleNavigation: state?.toggleNavigation,
    };
  },
});

export default TheTopBarContainer;
</script>

<template>
  <TheTopBar @openNavigation="toggleNavigation?.()">
    <template #left>
      <slot name="left" />
    </template>

    <template #right>
      <slot name="right" />
    </template>
  </TheTopBar>
</template>
