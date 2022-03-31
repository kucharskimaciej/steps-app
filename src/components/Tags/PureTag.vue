<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import { Tag } from "../../../common/types/Tag";

const PureTag = defineComponent({
  props: {
    tag: Object as PropType<Tag>,
    showType: {
      type: Boolean,
      default: true
    }
  }
});

export default PureTag;
</script>

<template>
  <span class="bg-gray-200 text-gray-700 px-3 py-1 rounded-sm text-xs">
    <slot name="prepend" />
    <span
      v-if="showType && tag.type"
      class="text-gray-600 font-hairline text-2xs mr-1"
      >{{ tag.type }}</span
    >
    <slot>{{ tag.text }}</slot>
    <slot name="append" />
  </span>
</template>
