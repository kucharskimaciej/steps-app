<template>
  <div class="min-h-screen font-primary text-mono-100 font-light bg-mono-950">
    <slot />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class GlobalStyles extends Vue {}
</script>

<style lang="scss">
$material-design-icons-font-directory-path: "~material-design-icons-iconfont/dist/fonts/";
@import "../vendor/material-design-icons";

html {
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
