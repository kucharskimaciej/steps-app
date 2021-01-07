import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import FullContent from "@/components/Step/FullContent.vue";
import { stepFactory } from "@/stories/fixtures/steps";

export default {
  title: "Components/Step/FullContent",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    FullContent
  },
  template: `<FullContent :step="step" />`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});
