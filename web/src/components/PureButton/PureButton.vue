<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export type ButtonKind = "primary" | "success" | "warning" | "danger";
export type ButtonSize = "regular" | "small" | "large";
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
            `;
        case "outline":
            return `
                bg-transparent
                border-${primaryColor}-base
                text-${primaryColor}-base 
                hover:border-${primaryColor}-light
                hover:text-${primaryColor}-light
            `;
        case "ghost":
            return `
                bg-gray-100
                border-transparent
                hover:bg-gray-200
                hover:text-${primaryColor}-base
            `;
    }
}

export function buttonSize(size: ButtonSize): string {
    switch (size) {
        case "regular":
            return `px-3 py-1 text-sm`;
        case "small":
            return `px-2 py-1 text-2xs`;
        case "large":
            return `px-4 py-2 text-xl`;
    }
}

@Component
export default class PureButton extends Vue {
    @Prop({ default: "primary" }) private kind!: ButtonKind;
    @Prop({ default: "regular" }) private feel!: ButtonFeel;
    @Prop({ default: "regular" }) private size!: ButtonSize;
    @Prop() private disabled!: boolean;

    get commonClasses(): string {
        return "font-light rounded border align-middle focus:outline-none active:shadow-inner focus:shadow";
    }

    get sizeClasses(): string {
        return buttonSize(this.size);
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
    <button
        :class="[commonClasses, statusClasses, sizeClasses, colorClasses]"
        v-on="$listeners"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>
