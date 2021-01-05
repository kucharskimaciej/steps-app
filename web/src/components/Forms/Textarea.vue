<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Emit,
  InjectReactive
} from "vue-property-decorator";

@Component
export default class Textarea extends Vue {
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
  <textarea
    class="w-full font-light bg-gray-200 outline-none rounded px-3 py-2 border focus:bg-white focus:shadow focus:border-gray-100"
    :value="value"
    :class="validityClasses"
    @input="handleValueChange"
  />
</template>
