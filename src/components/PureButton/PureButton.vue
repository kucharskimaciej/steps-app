<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export type ButtonKind = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "regular" | "small" | "large";
export type ButtonSpacing = "regular" | "wide";

// CHANGES HERE NEED TO BE PROPAGATED IN THE POST CSS PURGE WHITELIST
export function buttonColors(kind: ButtonKind): string {
  switch (kind) {
    case "primary":
      return `
        bg-mono-black
        border-mono-black
        hover:bg-mono-100
        hover:border-mono-100
        text-white
        focus:bg-mono-200
      `;

    case "secondary":
      return `
        bg-mono-800
        border-mono-800
        text-mono-100
        focus:bg-mono-700
      `;

    case "outline":
      return `
        bg-transparent
        border-mono-black
        text-mono-100
        hover:border-mono-100
        hover:text-mono-100
        focus:border-mono-200
        focus:text-mono-200
      `;
    case "ghost":
      return `
        text-mono-100
        bg-transparent
        border-transparent
        hover:bg-mono-900
        hover:text-mono-200
    `;
  }
}

export function buttonSize(size: ButtonSize, spacing: ButtonSpacing): string {
  switch (size) {
    case "regular":
      return spacing === "wide"
        ? `px-6 py-1 border text-base`
        : `px-3 py-1 border text-base`;
    case "small":
      return spacing === "wide"
        ? `px-4 py-1 border text-sm`
        : `px-2 py-1 border text-sm`;
    case "large":
      return spacing === "wide"
        ? `px-10 py-1 border-2 text-xl`
        : `px-4 py-1 border-2 text-xl`;
  }
}

const PureButton = defineComponent({
  props: {
    kind: {
      type: String as PropType<ButtonKind>,
      default: "primary"
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: "regular"
    },
    spacing: {
      type: String as PropType<ButtonSpacing>,
      default: "regular"
    },
    tag: {
      type: String,
      default: "button"
    },
    disabled: Boolean
  },
  setup(props) {
    const sizeClasses = computed(() => buttonSize(props.size, props.spacing));
    const colorClasses = computed(() => buttonColors(props.kind));

    return {
      sizeClasses,
      colorClasses
    };
  }
});

export default PureButton;
</script>

<template>
  <component
    :is="tag"
    class="inline-block font-light rounded focus:outline-none"
    :class="[
      { 'opacity-50 cursor-not-allowed': disabled },
      sizeClasses,
      colorClasses
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>
