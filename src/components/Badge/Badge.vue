<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Badge extends Vue {}
</script>

<template>
  <span
    class="bg-mono-200 rounded-sm text-2xs text-mono-white font-bold px-1 py-1"
    v-on="$listeners"
    ><slot
  /></span>
</template>
