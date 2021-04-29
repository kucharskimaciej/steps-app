<script lang="ts">
import { Component } from "vue-property-decorator";
import { ModalView } from "@/components/Modal/modalClass";
import Overlay from "@/components/Modal/Overlay.vue";

@Component({
  components: {
    Overlay
  }
})
export default class BorderlessOverlay extends ModalView {}
</script>

<template>
  <Overlay borderless @close="close()"><slot /></Overlay>
</template>
