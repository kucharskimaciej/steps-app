<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureIcon
  }
})
export default class DropdownMenu extends Vue {
  @Prop({ default: () => [] }) private options!: Array<{
    value: string;
    label: string;
  }>;
  @Prop() private value!: string;

  @Emit("input")
  handleValueChange(event: InputEvent) {
    return (event.target as HTMLInputElement).value;
  }
}
</script>

<template>
  <div class="relative text-lg">
    <select
      class="w-full appearance-none bg-transparent outline-none rounded px-4 py-3 border-0 hover:bg-mono-900 focus:bg-mono-900"
      :value="value"
      @change="handleValueChange"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <aside v-if="options.length > 1" class="absolute right-0 top-0 mr-3 mt-3">
      <PureIcon type="arrow_drop_down" class="text-2xl" />
    </aside>
  </div>
</template>
