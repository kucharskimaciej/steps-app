<script lang="ts">
import { defineComponent, PropType } from "vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

type OptionType = {
  value: string;
  label: string;
};

const DropdownMenu = defineComponent({
  components: {
    PureIcon,
  },
  props: {
    value: String,
    options: {
      type: Array as PropType<OptionType[]>,
      default: () => [],
    },
  },
  emits: ["input"],
  setup(_, { emit }) {
    return {
      handleValueChange(event: InputEvent) {
        emit("input", (event.target as HTMLInputElement).value);
      },
    };
  },
});

export default DropdownMenu;
</script>

<template>
  <div class="relative text-lg">
    <select
      class="w-full appearance-none bg-transparent outline-none rounded px-4 py-3 border-0 hover:bg-mono-900 focus:bg-mono-900"
      :value="value"
      @change="handleValueChange($event)"
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
