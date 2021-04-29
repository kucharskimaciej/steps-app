import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import StepTitle from "@/components/Step/components/StepTitle.vue";
import { stepFactory } from "../../../stories/fixtures/steps";

export default {
  title: "Components/Step/components/StepTitle",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Simple: () => Component = () => ({
  components: {
    StepTitle
  },
  template: `
    <StepTitle :step="step"/>`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const WithLink: () => Component = () => ({
  components: {
    StepTitle
  },
  template: `
    <StepTitle :step="step" link-to-video/>`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});
