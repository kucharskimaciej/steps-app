<script lang="ts">
import {
  Vue,
  Component,
  InjectReactive,
  Prop,
  Emit
} from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class PureCheckbox extends Vue {
  @Prop() private value!: boolean;
  @InjectReactive({ from: "hasError", default: false }) hasError!: boolean;

  @Emit("input")
  handleChange() {
    return !this.value;
  }

  get iconClasses() {
    return `text-3xl ${this.hasError ? "text-red-lighter" : "text-gray-700"}`;
  }
}
</script>

<template>
  <label
    class="cursor-pointer flex items-center"
    :class="{ 'text-red-lighter': hasError }"
  >
    <input
      type="checkbox"
      :checked="value"
      @change="handleChange"
      class="hidden"
    />
    <span class="block mr-1">
      <PureIcon v-if="value" type="check_box" :class="iconClasses" />
      <PureIcon v-else type="check_box_outline_blank" :class="iconClasses" />
    </span>
    <slot></slot>
  </label>
</template>
