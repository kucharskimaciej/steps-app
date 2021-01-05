<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class WideWithSidebarRight extends Vue {}
</script>

<template>
  <div class="mx-auto w-full flex flex-wrap">
    <main class="desktop:w-3/5 w-full">
      <slot />
    </main>
    <aside class="desktop:w-2/5 w-full flex-shrink-0">
      <slot name="sidebar" />
    </aside>
  </div>
</template>
