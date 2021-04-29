import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import ReadonlyStep from "@/components/Step/ReadonlyStep.vue";
import { stepFactory } from "@/stories/fixtures/steps";

export default {
  title: "Components/Step/ReadonlyStep",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    ReadonlyStep
  },
  template: `
    <ReadonlyStep :step="step" />
  `,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const LongTitle: () => Component = () => ({
  components: {
    ReadonlyStep
  },
  template: `
    <ReadonlyStep :step="step" />
  `,
  methods: {},
  data: () => ({
    step: stepFactory(1)
  }),
  props: {}
});
