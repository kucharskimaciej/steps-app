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
@import url("https://fonts.googleapis.com/css?family=Proza+Libre:300,400,600|Roboto:100,300,500&display=swap&subset=latin-ext");
</style>
