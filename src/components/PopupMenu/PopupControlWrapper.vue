<script lang="ts">
import { Vue, Component, Emit, Provide } from "vue-property-decorator";

@Component
export default class PopupControlWrapper extends Vue {
  @Provide("onItemClick")
  @Emit()
  itemClicked() {}
}
</script>

<template>
  <section><slot></slot></section>
</template>
