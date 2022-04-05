<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const FullWithSidebar = defineComponent({});
export default FullWithSidebar;
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
