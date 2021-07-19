<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import ThreeStateTag from "@/components/Forms/TagsSelection/ThreeStateTag.vue";
import {
  KeyValueTuple,
  OptionWithLabel,
  ValueType
} from "@/components/Forms/TagsSelection/types";

@Component({
  components: {
    ThreeStateTag
  }
})
export default class TagsSelection extends Vue {
  @Prop({ required: true }) private options!: OptionWithLabel[];
  @Prop({ default: () => [] }) private value!: KeyValueTuple[];

  @Emit("input")
  handleChange(key: string, newValue: ValueType): KeyValueTuple[] {
    if (this.getValueTuple(key)) {
      return this.value
        .map(tuple => {
          const [k] = tuple;

          if (k !== key) {
            return tuple;
          }

          return [key, newValue] as KeyValueTuple;
        })
        .filter(([, value]) => value !== 0);
    } else {
      return [...this.value, [key, newValue]];
    }
  }

  getValueOrDefault(key: string): ValueType {
    const [, value] = this.getValueTuple(key) || [key, 0];
    return value;
  }

  private getValueTuple(key: string): KeyValueTuple | undefined {
    return this.value.find(([k]) => k === key);
  }
}
</script>

<template>
  <section>
    <ThreeStateTag
      v-for="option of options"
      :key="option.key"
      class="mr-2 mt-2 inline-block"
      :tag="{ text: option.key }"
      :value="getValueOrDefault(option.key)"
      @input="handleChange(option.key, $event)"
    >
      {{ option.label }}
    </ThreeStateTag>
  </section>
</template>
