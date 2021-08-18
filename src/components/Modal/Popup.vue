<script lang="ts">
import { Component } from "vue-property-decorator";
import { ModalView } from "@/components/Modal/modalClass";

@Component
export default class Popup extends ModalView {}
</script>

<template>
  <div
    class="relative overflow-hidden rounded mx-5 my-auto max-w-sm w-full desktop:mx-auto desktop:m-w-screen shadow"
  >
    <main class="bg-gray-100 w-full h-full overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
