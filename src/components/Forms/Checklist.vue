<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import PureCheckbox from "@/components/Forms/PureCheckbox.vue";
import { sortBy, without } from "lodash";

const Checklist = defineComponent({
  components: {
    PureCheckbox
  },
  props: {
    value: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  emits: ["input"],
  setup({ value, options }, { emit }) {
    function isChecked(option: string): boolean {
      return value.includes(option);
    }

    function handleChange(option: string) {
      const updatedValue = value.includes(option)
        ? without(value, option)
        : sortBy([...value, option], el => options.indexOf(el));

      console.log("updatedValue: ", updatedValue);

      emit("input", updatedValue);
    }

    return {
      isChecked,
      handleChange
    };
  }
});

export default Checklist;
</script>

<template>
  <div>
    <PureCheckbox
      v-for="option of options"
      :key="option"
      :value="isChecked(option)"
      @input="() => handleChange(option)"
    >
      <slot :option="option" />
    </PureCheckbox>
  </div>
</template>
