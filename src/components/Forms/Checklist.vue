<script lang="ts">
import { defineComponent, PropType } from "vue";
import PureCheckbox from "@/components/Forms/PureCheckbox.vue";
import { sortBy, without } from "lodash";

const Checklist = defineComponent({
  components: {
    PureCheckbox,
  },
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    function isChecked(option: string): boolean {
      return props.modelValue.includes(option);
    }

    function handleChange(option: string) {
      const updatedValue = props.modelValue.includes(option)
        ? without(props.modelValue, option)
        : sortBy([...props.modelValue, option], (el) =>
            props.options.indexOf(el)
          );

      emit("update:modelValue", updatedValue);
    }

    return {
      isChecked,
      handleChange,
    };
  },
});

export default Checklist;
</script>

<template>
  <div>
    <PureCheckbox
      v-for="option of options"
      :key="option"
      :model-value="isChecked(option)"
      @update:model-value="() => handleChange(option)"
    >
      <slot :option="option" />
    </PureCheckbox>
  </div>
</template>
