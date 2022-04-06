<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const PureCheckbox = defineComponent({
  components: { PureIcon },
  props: {
    value: Boolean,
  },
  emits: ["input"],
  setup() {
    const hasError = inject<boolean>("hasError", false);
    const iconClasses = computed(
      () => `text-3xl ${hasError ? "text-red-lighter" : "text-gray-700"}`
    );

    return {
      hasError,
      iconClasses,
    };
  },
});

export default PureCheckbox;
</script>

<template>
  <label
    class="cursor-pointer flex items-center"
    :class="{ 'text-red-lighter': hasError }"
  >
    <input
      type="checkbox"
      :checked="value"
      class="hidden"
      @change="$emit('input', !value)"
    />
    <span class="block mr-1">
      <PureIcon v-if="value" type="check_box" :class="iconClasses" />
      <PureIcon v-else type="check_box_outline_blank" :class="iconClasses" />
    </span>
    <slot />
  </label>
</template>
