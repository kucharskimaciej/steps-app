<script lang="ts">
import { computed, defineComponent, inject } from "vue";

const Textarea = defineComponent({
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const hasError = inject<boolean>("hasError", false);

    const validityClasses = computed(() =>
      hasError
        ? "border-red-light text-red-lighter placeholder-red-darker"
        : "border-gray-200 text-base"
    );

    function handleValueChange(event: InputEvent) {
      emit("update:modelValue", (event.target as HTMLInputElement).value);
    }

    return {
      hasError,
      validityClasses,
      handleValueChange,
    };
  },
});

export default Textarea;
</script>

<template>
  <textarea
    class="w-full font-light bg-gray-200 outline-none rounded px-3 py-2 border focus:bg-white focus:shadow focus:border-gray-100"
    :value="modelValue"
    :class="validityClasses"
    @input="handleValueChange($event)"
  />
</template>
