<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export type ButtonKind = "primary" | "success" | "warning" | "danger";

export type ButtonStylesOptions = {
    backgroundColor: string;
    textColor: string;
};
export function buttonStyles({
    backgroundColor,
    textColor
}: ButtonStylesOptions): string {
    return [
        `border`,
        `bg-${backgroundColor}-base`,
        `border-${backgroundColor}-base`,
        `hover:bg-${backgroundColor}-light`,
        `hover:border-${backgroundColor}-light`,
        `text-${textColor}`
    ].join(" ");
}

@Component
export default class PureButton extends Vue {
    @Prop({ default: "primary" }) private kind!: ButtonKind;
    @Prop() private disabled!: boolean;

    private readonly KIND: Record<ButtonKind, string> = {
        primary: buttonStyles({ backgroundColor: "blue", textColor: "white" }),
        danger: buttonStyles({ backgroundColor: "red", textColor: "white" }),
        success: buttonStyles({ backgroundColor: "green", textColor: "white" }),
        warning: buttonStyles({ backgroundColor: "yellow", textColor: "white" })
    };

    get commonClasses(): string {
        return "px-4 py-2 text-normal font-light text-base rounded";
    }

    get kindClasses(): string {
        return this.KIND[this.kind];
    }

    get statusClasses(): string {
        return this.disabled ? "opacity-75 cursor-not-allowed" : "";
    }
}
</script>

<template>
    <button
        :class="[commonClasses, kindClasses, statusClasses]"
        v-on="$listeners"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>
