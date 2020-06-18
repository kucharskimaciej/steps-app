<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export type ButtonKind = "primary" | "success" | "warning" | "danger";
export type ButtonSize = "regular" | "small" | "large";
export type ButtonSpacing = "regular" | "wide";
export type ButtonFeel = "regular" | "outline" | "ghost";

const kindToColorMap: Record<ButtonKind, string> = {
  primary: "blue",
  success: "green",
  danger: "red",
  warning: "yellow"
};

export function buttonColors(kind: ButtonKind, feel: ButtonFeel): string {
  const primaryColor = kindToColorMap[kind];

  switch (feel) {
    case "regular":
      return `
                bg-${primaryColor}-base
                border-${primaryColor}-base
                hover:bg-${primaryColor}-light
                hover:border-${primaryColor}-light
                text-white
                active:shadow-inner focus:shadow
            `;
    case "outline":
      return `
                bg-transparent
                border-${primaryColor}-base
                text-${primaryColor}-base
                hover:border-${primaryColor}-light
                hover:text-${primaryColor}-light
                active:shadow-inner focus:shadow
            `;
    case "ghost":
      return `
                text-${primaryColor}-base
                bg-transparent
                border-transparent
                hover:bg-gray-100
                hover:text-${primaryColor}-light
            `;
  }
}

export function buttonSize(size: ButtonSize, spacing: ButtonSpacing): string {
  switch (size) {
    case "regular":
      return spacing === "wide"
        ? `px-6 py-1 border text-sm`
        : `px-3 py-1 border text-sm`;
    case "small":
      return spacing === "wide"
        ? `px-4 py-1 border text-2xs`
        : `px-2 py-1 border text-2xs`;
    case "large":
      return spacing === "wide"
        ? `px-10 py-1 border-2 text-xl`
        : `px-4 py-1 border-2 text-xl`;
  }
}

@Component
export default class PureButton extends Vue {
  @Prop({ default: "primary" }) private kind!: ButtonKind;
  @Prop({ default: "regular" }) private feel!: ButtonFeel;
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
    return this.disabled ? "opacity-75 cursor-not-allowed" : "";
  }

  get colorClasses(): string {
    return buttonColors(this.kind, this.feel);
  }
}
</script>

<template>
  <component
    :is="tag"
    :class="[commonClasses, statusClasses, sizeClasses, colorClasses]"
    v-on="$listeners"
    :disabled="disabled"
  >
    <slot></slot>
  </component>
</template>
