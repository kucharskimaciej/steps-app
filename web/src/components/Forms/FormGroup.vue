<script lang="ts">
    import { Vue, Component, Prop, ProvideReactive } from "vue-property-decorator";

@Component({ inject: [] })
export default class FormGroup extends Vue {
    @Prop() private label!: string;
    @Prop() private invalid!: boolean;

    @ProvideReactive('hasError') get hasError() {
        return this.invalid;
    }
}
</script>

<template>
    <section class="mb-5">
        <label
            class="block ml-3 mb-1 text-sm font-bold "
            :class="{
                'text-gray-700': !hasError,
                'text-red-lighter': hasError
            }"
            >{{ label }}</label
        >
        <slot></slot>
    </section>
</template>
