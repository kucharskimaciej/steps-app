<script lang="ts">
import { defineComponent, PropType } from "vue";
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
  setup(props, { emit }) {
    function isChecked(option: string): boolean {
      return props.value.includes(option);
    }

    function handleChange(option: string) {
      const updatedValue = props.value.includes(option)
        ? without(props.value, option)
        : sortBy([...props.value, option], el => props.options.indexOf(el));

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
