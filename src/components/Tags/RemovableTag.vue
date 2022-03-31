<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";
import PureTag from "@/components/Tags/PureTag.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { Tag } from "../../../common/types/Tag";

const RemovableTag = defineComponent({
  components: {
    PureTag,
    PureIcon
  },
  props: {
    tag: Object as PropType<Tag>,
    showType: {
      type: Boolean,
      default: true
    }
  },
  emits: ["remove"]
});

export default RemovableTag;
</script>

<template>
  <PureTag :tag="tag" :show-type="showType">
    <template #append>
      <a class="hover:text-gray-200 cursor-pointer" @click="$emit('remove')">
        <PureIcon type="close" />
      </a>
    </template>
  </PureTag>
</template>
