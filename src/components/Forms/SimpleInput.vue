<script lang="ts">
import { computed, defineComponent, inject, ref } from "vue";

const SimpleInput = defineComponent({
  components: {},
  props: {
    value: String,
    lazy: Boolean,
  },
  emits: ["input"],
  setup(_, { emit }) {
    const hasError = inject<boolean>("hasError", false);
    const inputElement = ref<HTMLInputElement>();

    const validityClasses = computed(() =>
      hasError
        ? "border-red-light text-red-lighter placeholder-red-darker"
        : "border-gray-200 text-base"
    );

    function handleValueInput(event: InputEvent) {
      emit("input", (event.target as HTMLInputElement).value);
    }

    function focus() {
      inputElement.value?.focus();
    }

    return {
      hasError,
      validityClasses,
      handleValueInput,
      focus,
    };
  },
});

export default SimpleInput;
</script>

<template>
  <div
    class="w-full flex font-light bg-gray-200 rounded px-3 py-2 border focus-within:bg-white focus-within:shadow focus-within:border-gray-100"
  >
    <input
      ref="element"
      v-bind="$attrs"
      class="outline-none font-light bg-transparent w-full"
      :value="value"
      :class="validityClasses"
      @input="lazy ? null : handleValueInput($event)"
      @change="lazy ? handleValueInput($event) : null"
    />
    <slot name="after" />
  </div>
</template>
