<template>
  <div class="min-h-screen font-primary text-wood-bark font-light bg-gray-100">
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
@import url("https://fonts.googleapis.com/css?family=Cabin:400,500, 600|Roboto+Condensed:400,700&subset=latin-ext");
</style>
