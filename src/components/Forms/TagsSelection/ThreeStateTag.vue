<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import PureTag from "@/components/Tags/PureTag.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { ValueType } from "@/components/Forms/TagsSelection/types";
import { Tag } from "../../../../common/types/Tag";

const nextState: Record<ValueType, ValueType> = {
  "-1": 0,
  0: 1,
  1: -1,
};

const ThreeStateTag = defineComponent({
  components: {
    PureTag,
    PureIcon,
  },
  props: {
    tag: Object as PropType<Tag>,
    modelValue: {
      type: Number as PropType<ValueType>,
      default: 0,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isIncluded = computed(() => props.modelValue === 1);
    const isExcluded = computed(() => props.modelValue === -1);

    function handleChange() {
      emit("update:modelValue", nextState[props.modelValue]);
    }

    return {
      handleChange,
      isExcluded,
      isIncluded,
    };
  },
});

export default ThreeStateTag;
</script>

<template>
  <PureTag
    :tag="tag"
    :show-type="false"
    :class="{
      'bg-mono-100 text-mono-white': isIncluded,
      'opacity-50': isExcluded,
    }"
    class="cursor-pointer select-none text-normal px-4 py-2"
    @click="handleChange"
  >
    <template #prepend>
      <PureIcon v-if="isIncluded" type="done" class="-ml-1 mr-1" />
      <PureIcon v-if="isExcluded" type="close" class="-ml-1 mr-1" />
    </template>
    <slot></slot>
  </PureTag>
</template>
