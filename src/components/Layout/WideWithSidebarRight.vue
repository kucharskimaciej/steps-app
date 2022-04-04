<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const WideWithSidebarRight = defineComponent({});

export default WideWithSidebarRight;
</script>

<template>
  <div class="mx-auto w-full flex items-stretch">
    <main class="desktop:w-3/5 w-full">
      <slot />
    </main>
    <aside class="desktop:w-2/5 w-full flex-shrink-0">
      <slot name="sidebar" />
    </aside>
  </div>
</template>
