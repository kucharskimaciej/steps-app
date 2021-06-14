<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import ThreeStateTag, { ValueType } from "@/components/Forms/ThreeStateTag.vue";
import { Tag } from "../../../../common/types/Tag";

type TagValueTuple = [Tag, ValueType];

@Component({
  components: {
    ThreeStateTag
  }
})
export default class TagsSelection extends Vue {
  @Prop({ required: true }) private tags!: Tag[];
  @Prop({ default: () => [] }) private value!: TagValueTuple[];

  @Emit("input")
  handleChange(tag: Tag, newValue: ValueType): TagValueTuple[] {
    if (this.getValueTuple(tag)) {
      return this.value
        .map(tuple => {
          const [t] = tuple;

          if (t.text !== tag.text) {
            return tuple;
          }

          if (newValue === 0) {
            return null;
          }

          return [tag, newValue];
        })
        .filter(Boolean);
    } else {
      return [...this.value, [tag, newValue]];
    }
  }

  getValueOrDefault(tag: Tag): ValueType {
    const [, value] = this.getValueTuple(tag) || [tag, 0];
    return value;
  }

  private getValueTuple(tag: Tag): TagValueTuple | undefined {
    return this.value.find(([t]) => t.text === tag.text);
  }
}
</script>

<template>
  <section>
    <ThreeStateTag
      v-for="tag of tags"
      :key="tag.text"
      class="mr-2"
      :tag="tag"
      :value="getValueOrDefault(tag)"
      @input="handleChange(tag, $event)"
    />
  </section>
</template>
