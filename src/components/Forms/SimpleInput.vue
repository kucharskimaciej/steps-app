<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  InjectReactive
} from "vue-property-decorator";
import { Focusable } from "@/components/Forms/types";

@Component
export default class SimpleInput extends Vue implements Focusable {
  @Prop() private value!: string;

  @Emit("input")
  handleValueInput(event: InputEvent) {
    return (event.target as HTMLInputElement).value;
  }

  @InjectReactive({ from: "hasError", default: false }) hasError!: boolean;

  get validityClasses() {
    return this.hasError
      ? "border-red-light text-red-lighter placeholder-red-darker"
      : "border-gray-200 text-base";
  }

  get inputElement() {
    return this.$refs.element as HTMLInputElement;
  }

  focus() {
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }
}
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
      @input="handleValueInput"
    />
    <slot name="after" />
  </div>
</template>
