<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class WideWithSidebarRight extends Vue {}
</script>

<template>
  <div class="py-10 mx-auto px-6 w-full flex">
    <main class="pr-3 w-3/5">
      <slot />
    </main>
    <aside class="pl-3 w-2/5 flex-shrink-0">
      <slot name="sidebar" />
    </aside>
  </div>
</template>
