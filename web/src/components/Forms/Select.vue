<script lang="ts">
import {
    Vue,
    Component,
    Prop,
    Emit,
    InjectReactive
} from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
    components: { PureIcon }
})
export default class Select extends Vue {
    @Prop() private value!: string;

    @Emit("input")
    handleValueChange(event: InputEvent) {
        return (event.target as HTMLInputElement).value;
    }

    @InjectReactive({ from: "hasError", default: false }) hasError!: boolean;

    get validityClasses() {
        return this.hasError
            ? "border-red-light text-red-lighter placeholder-red-darker"
            : "border-gray-200 text-base";
    }
}
</script>

<template>
    <div class="relative">
        <select
            class="relative w-full font-light appearance-none bg-gray-200 outline-none rounded px-3 py-2 border focus:bg-white focus:shadow focus:border-gray-100"
            :value="value"
            @input="handleValueChange"
            :class="validityClasses"
        >
            <slot></slot>
        </select>
        <aside class="absolute right-0 top-0 mr-2 mt-2">
            <PureIcon
                type="arrow_drop_down"
                :class="{ 'text-red-lighter placeholder-red-darker': hasError }"
            />
        </aside>
    </div>
</template>
