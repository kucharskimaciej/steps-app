<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import Container from "@/components/Layout/Container.vue";

@Component({
  components: {
    Container
  }
})
export default class SessionsView extends VueWithStore {}
</script>

<template>
  <Container>
    hello sesssions
  </Container>
</template>
