<script lang="ts">
import { defineComponent, PropType } from "vue";
import ThreeStateTag from "@/components/Forms/TagsSelection/ThreeStateTag.vue";
import {
  KeyValueTuple,
  OptionWithLabel,
  ValueType,
} from "@/components/Forms/TagsSelection/types";

const TagsSelection = defineComponent({
  components: {
    ThreeStateTag,
  },
  props: {
    modelValue: {
      type: Array as PropType<KeyValueTuple[]>,
      default: () => [],
    },
    options: {
      type: Array as PropType<OptionWithLabel[]>,
      required: true,
    },
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    function getValueTuple(key: string): KeyValueTuple | undefined {
      return props.modelValue.find(([k]) => k === key);
    }

    function handleChange(key: string, newValue: ValueType) {
      let result: KeyValueTuple[];
      if (getValueTuple(key)) {
        result = props.modelValue
          .map((tuple) => {
            const [k] = tuple;

            if (k !== key) {
              return tuple;
            }

            return [key, newValue] as KeyValueTuple;
          })
          .filter(([, v]) => v !== 0);
      } else {
        result = [...props.modelValue, [key, newValue]];
      }

      emit("update:modelValue", result);
    }

    function getValueOrDefault(key: string): ValueType {
      const [, v] = getValueTuple(key) || [key, 0];
      return v;
    }

    return {
      handleChange,
      getValueOrDefault,
    };
  },
});

export default TagsSelection;
</script>

<template>
  <section>
    <ThreeStateTag
      v-for="option of options"
      :key="option.key"
      class="mr-2 mt-2 inline-block"
      :tag="{ text: option.key }"
      :model-value="getValueOrDefault(option.key)"
      @update:modelValue="handleChange(option.key, $event)"
    >
      {{ option.label }}
    </ThreeStateTag>
  </section>
</template>
