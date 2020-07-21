<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "../../lib/vueWithStore";

@Component
export default class PublicStep extends VueWithStore {}
</script>

<template>
  <p>hello, public</p>
</template>
