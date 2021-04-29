import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu.vue";

export default {
  title: "Components/DropdownMenu",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    DropdownMenu
  },
  template: `<div>
  <DropdownMenu v-model="value" :options="options" />
  Selected {{ value }}
  </div>`,
  methods: {},
  data: () => ({
    value: "option2",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ]
  }),
  props: {}
});
