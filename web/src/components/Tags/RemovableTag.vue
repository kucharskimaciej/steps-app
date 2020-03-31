<template>
  <PureTag :tag="tag" :show-type="showType">
    <template #append>
      <a class="hover:text-gray-200 cursor-pointer" @click="remove()">
        <PureIcon type="close" />
      </a>
    </template>
  </PureTag>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Tag } from "../../../../common/types/Tag";
import PureTag from "@/components/Tags/PureTag.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    PureTag,
    PureIcon
  }
})
export default class RemovableTag extends Vue {
  @Prop() private readonly tag!: Tag;
  @Prop({ default: true }) private readonly showType!: boolean;

  @Emit()
  remove() {}
}
</script>
