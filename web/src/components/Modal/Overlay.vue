<script lang="ts">
import { Component } from "vue-property-decorator";
import Close from "@/components/Modal/Close.vue";
import { ModalView } from "@/components/Modal/modalClass";

@Component({
  components: {
    Close
  }
})
export default class Overlay extends ModalView {}
</script>

<template>
  <div
    class="relative overflow-hidden desktop:rounded desktop:my-10 desktop:mx-auto max-w-6xl w-full desktop:m-h-80 desktop:m-w-screen "
  >
    <main class="bg-gray-100 w-full h-full overflow-y-auto desktop:p-14">
      <slot />
    </main>
    <Close @click="close()" />
  </div>
</template>
