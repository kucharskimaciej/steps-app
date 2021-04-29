<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import PureCheckbox from "./PureCheckbox.vue";
import { without, sortBy } from "lodash";

@Component({
  components: {
    PureCheckbox
  }
})
export default class Checklist extends Vue {
  @Prop({ default: () => [] }) private value!: string[];
  @Prop({ default: () => [] }) private options!: any[];

  @Emit("input")
  handleChange(option: string) {
    return this.value.includes(option)
      ? without(this.value, option)
      : sortBy([...this.value, option], el => this.options.indexOf(el));
  }

  isChecked(option: string): boolean {
    return this.value.includes(option);
  }
}
</script>

<template>
  <div>
    <PureCheckbox
      v-for="option of options"
      :key="option"
      :value="isChecked(option)"
      @input="() => handleChange(option)"
    >
      <slot :option="option" />
    </PureCheckbox>
  </div>
</template>
