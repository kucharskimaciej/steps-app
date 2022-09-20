<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const Select = defineComponent({
  components: { PureIcon },
  props: {
    modelValue: [String, Number],
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

export default Select;
</script>

<template>
  <div class="relative">
    <select
      class="relative w-full font-light appearance-none bg-gray-200 outline-none rounded px-3 py-2 border focus:bg-white focus:shadow focus:border-gray-100"
      :value="modelValue"
      :class="validityClasses"
      @input="handleValueChange($event)"
    >
      <slot />
    </select>
    <aside class="absolute right-0 top-0 mr-2 mt-2">
      <PureIcon
        type="arrow_drop_down"
        :class="{ 'text-red-lighter placeholder-red-darker': hasError }"
      />
    </aside>
  </div>
</template>
