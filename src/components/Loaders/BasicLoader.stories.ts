import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";

export default {
  title: "Components/Loaders/BasicLoader",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    BasicLoader
  },
  template: `
    <BasicLoader />
  `,
  methods: {},
  data: () => ({}),
  props: {}
});
