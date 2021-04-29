<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

type Overflow = "default" | "hidden" | "scroll";

@Component
export default class ContentBox extends Vue {
  @Prop({ default: "default" }) private overflow!: Overflow;
}
</script>

<template>
  <div
    class="p-4 border-gray-300"
    :class="{
      'overflow-y-hidden': overflow === 'hidden',
      'overflow-y-auto': overflow === 'scroll'
    }"
  >
    <div>
      <slot />
    </div>
  </div>
</template>
