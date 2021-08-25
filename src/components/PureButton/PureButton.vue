<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

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
        ? `px-6 py-1 border text-normal`
        : `px-3 py-1 border text-normal`;
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

@Component
export default class PureButton extends Vue {
  @Prop({ default: "primary" }) private kind!: ButtonKind;
  @Prop({ default: "regular" }) private size!: ButtonSize;
  @Prop({ default: "regular" }) private spacing!: ButtonSpacing;
  @Prop({ default: "button" }) private tag!: string;
  @Prop() private disabled!: boolean;

  get commonClasses(): string {
    return "inline-block font-light rounded focus:outline-none";
  }

  get sizeClasses(): string {
    return buttonSize(this.size, this.spacing);
  }

  get statusClasses(): string {
    return this.disabled ? "opacity-50 cursor-not-allowed" : "";
  }

  get colorClasses(): string {
    return buttonColors(this.kind);
  }
}
</script>

<template>
  <component
    :is="tag"
    :class="[commonClasses, statusClasses, sizeClasses, colorClasses]"
    :disabled="disabled"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>
