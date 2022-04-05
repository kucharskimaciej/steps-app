<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useModalView } from "@/components/Modal/modalClass";

const Popup = defineComponent({
  emits: ["close"],
  setup(_, ctx) {
    return useModalView(ctx);
  }
});

export default Popup;
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
