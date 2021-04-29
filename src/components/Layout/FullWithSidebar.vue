<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FullWithSidebar extends Vue {}
</script>

<template>
  <div
    class="flex flex-col desktop:flex-row items-stretch h-screen w-full max-w-full"
  >
    <section
      class="sidebar w-full max-w-none desktop:w-1/5 desktop:max-w-xs flex-shrink-0"
    >
      <slot name="sidebar" />
    </section>

    <section class="main w-full flex-shrink">
      <slot />
    </section>
  </div>
</template>
