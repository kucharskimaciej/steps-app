<script lang="ts">
import { Vue, Component, Inject } from "vue-property-decorator";

@Component
export default class PopupMenuItem extends Vue {
  @Inject({ from: "onItemClick" }) handleItemClick!: string;
}
</script>

<template>
  <div
    class="px-4 py-2 text-center cursor-pointer border-b border-mono-800 text-sm font-semibold text-mono-200 hover:bg-mono-800"
    @click="handleItemClick"
  >
    <slot></slot>
  </div>
</template>
