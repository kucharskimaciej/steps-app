<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FullWithSidebar extends Vue {}
</script>

<template>
  <div class="flex items-stretch h-screen w-full max-w-full">
    <section class="sidebar w-1/5 flex-shrink-0">
      <slot name="sidebar" />
    </section>

    <section class="main w-full flex-shrink">
      <slot />
    </section>
  </div>
</template>

<style scoped>
.sidebar {
  min-width: 320px;
  max-width: 400px;
}
</style>
