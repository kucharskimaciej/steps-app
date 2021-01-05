<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop() private active!: boolean;
  @Prop() private allowActive!: boolean;

  @Emit()
  toggleActive() {
    return this.active;
  }
}
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
    @click="toggleActive()"
  >
    <aside class="mr-4 -mt-px flex-shrink-0">
      <slot name="prefix" :active="active" />
    </aside>
    <main>
      <slot :active="active" />
    </main>
  </div>
</template>
