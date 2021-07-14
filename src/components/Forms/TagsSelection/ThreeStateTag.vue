<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { Tag } from "../../../../common/types/Tag";
import PureTag from "@/components/Tags/PureTag.vue";
import { ValueType } from "@/components/Forms/TagsSelection/types";

@Component({
  components: {
    PureTag,
    PureIcon
  }
})
export default class ThreeStateTag extends Vue {
  @Prop() private tag!: Tag;
  @Prop() private value!: ValueType;

  private nextState: Record<ValueType, ValueType> = {
    "-1": 0,
    0: 1,
    1: -1
  };

  @Emit("input")
  handleChange() {
    return this.nextState[this.value];
  }

  get isIncluded() {
    return this.value === 1;
  }

  get isExcluded() {
    return this.value === -1;
  }
}
</script>

<template>
  <PureTag
    :tag="tag"
    :show-type="false"
    :class="{
      'bg-mono-100 text-mono-white': isIncluded,
      'opacity-50': isExcluded
    }"
    class="cursor-pointer select-none text-normal px-4 py-2"
    @click.native="handleChange"
  >
    <template #prepend>
      <PureIcon v-if="value === 1" type="done" class="-ml-1" />
      <PureIcon v-if="value === -1" type="close" class="-ml-1" />
    </template>
    <slot></slot>
  </PureTag>
</template>
