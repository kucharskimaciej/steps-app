<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Card = defineComponent({
  props: {
    active: Boolean,
    allowActive: Boolean
  }
});

export default Card;
</script>

<template>
  <div
    class="transition-colors p-3 rounded flex"
    :class="{
      'cursor-pointer hover:bg-gray-300': allowActive,
      'bg-white shadow-sm': !allowActive,
      'bg-gray-300': active,
      'hover:bg-opacity-95': allowActive && !active
    }"
    @click="$emit('toggle-active', active)"
  >
    <aside class="mr-4 -mt-px flex-shrink-0">
      <slot name="prefix" :active="active" />
    </aside>
    <main>
      <slot :active="active" />
    </main>
  </div>
</template>
