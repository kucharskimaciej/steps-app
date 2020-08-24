<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class WideWithSidebarRight extends Vue {}
</script>

<template>
  <div class="desktop:py-10 mx-auto px-3 desktop:px-6 w-full flex flex-wrap">
    <main class="desktop:pr-3 desktop:w-3/5 w-full">
      <slot />
    </main>
    <aside class="desktop:pl-3 desktop:w-2/5 w-full flex-shrink-0">
      <slot name="sidebar" />
    </aside>
  </div>
</template>
