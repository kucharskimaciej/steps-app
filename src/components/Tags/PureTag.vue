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

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tag } from "../../../common/types/Tag";

@Component
export default class PureTag extends Vue {
  @Prop() private readonly tag!: Tag;
  @Prop({ default: true }) private readonly showType!: boolean;
}
</script>
