<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>

<template>
  <div class="desktop:pt-10 mx-auto desktop:px-6 max-w-4xl w-full">
    <slot />
  </div>
</template>
