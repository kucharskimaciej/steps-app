<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Backdrop extends Vue {}
</script>

<template>
  <aside
    class="absolute inset-0 bg-black opacity-25"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
