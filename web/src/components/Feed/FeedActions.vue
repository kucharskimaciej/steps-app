<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FeedActions extends Vue {}
</script>

<template>
  <div class="border-b border-gray-200">
    <div class="actions -mx-2 flex justify-center">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.actions > * {
  width: 100%;
  max-width: calc(50% - theme("spacing.2"));
  @apply m-2;
}
</style>
