<script lang="ts">
import { defineComponent } from "vue";
import Close from "@/components/Modal/Close.vue";
import { useModalView } from "@/components/Modal/modalClass";

const Overlay = defineComponent({
  components: {
    Close,
  },
  emits: ["close"],
  props: {
    borderless: Boolean,
  },
  setup(_, ctx) {
    return useModalView(ctx);
  },
});

export default Overlay;
</script>

<template>
  <div
    class="relative overflow-hidden desktop:rounded desktop:my-10 desktop:mx-auto max-w-6xl w-full desktop:m-h-80 desktop:m-w-screen"
  >
    <main
      class="bg-gray-100 w-full h-full overflow-y-auto"
      :class="{
        'p-2 pt-10 desktop:p-14': !borderless,
      }"
    >
      <slot />
    </main>
    <Close icon-style="filled" @click="close()" />
  </div>
</template>
