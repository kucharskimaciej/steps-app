import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget";

export default {
  title: "Components/SelectToggleWidget",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    SelectToggleWidget
  },
  template: `
    <SelectToggleWidget :selected="selected" @toggle="toggle" />
  `,
  methods: {
    toggle() {
      this.selected = !this.selected;
    }
  },
  data: () => ({
    selected: false
  }),
  props: {}
});
