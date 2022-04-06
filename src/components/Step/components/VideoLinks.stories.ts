import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
} from "@/stories/decorators";
import StepVideoLinks from "@/components/Step/components/VideoLinks.vue";
import { stepFactory } from "@/stories/fixtures/steps";

export default {
  title: "Components/Step/components/VideoLinks",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
  ],
};

export const AllLinks: () => Component = () => ({
  components: {
    StepVideoLinks,
  },
  template: `
    <StepVideoLinks :step="step"/>
  `,
  methods: {},
  data: () => ({
    step: stepFactory(3),
  }),
  props: {},
});

export const SkipFirstLink: () => Component = () => ({
  components: {
    StepVideoLinks,
  },
  template: `
    <StepVideoLinks :step="step" skip-first/>
  `,
  methods: {},
  data: () => ({
    step: stepFactory(3),
  }),
  props: {},
});

export const SkipFirstWhenOnlyOne: () => Component = () => ({
  components: {
    StepVideoLinks,
  },
  template: `
    <StepVideoLinks :step="step" skip-first/>
  `,
  methods: {},
  data: () => ({
    step: stepFactory(),
  }),
  props: {},
});
