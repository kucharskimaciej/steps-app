import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import StepList from "@/components/StepList/StepList.vue";
import { stepsFactory } from "@/stories/fixtures/steps";
import { Step } from "../../../../common/types/Step";

export default {
  title: "Components/StepList/List",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    StepList
  },
  template: `
    <StepList :steps="steps" @step-click="handleStepClick" :is-selected="isSelected" :is-active="isActive"/>
  `,
  methods: {
    handleStepClick(stepId: string) {
      (this as any).activeStepId = stepId;
    },
    isActive(step: Step) {
      return (this as any).activeStepId === step.id;
    },
    isSelected(step: Step) {
      return step.identifier === 2;
    }
  },
  data: () => ({
    steps: stepsFactory(),
    activeStepId: ""
  }),
  props: {}
});

export const AllSelected: () => Component = () => ({
  components: {
    StepList
  },
  template: `
    <StepList :steps="steps" @step-click="handleStepClick" :is-selected="isSelected" :is-active="isActive"/>
  `,
  methods: {
    handleStepClick(stepId: string) {
      (this as any).activeStepId = stepId;
    },
    isActive(step: Step) {
      return (this as any).activeStepId === step.id;
    },
    isSelected() {
      return true;
    }
  },
  data: () => ({
    steps: stepsFactory(),
    activeStepId: ""
  }),
  props: {}
});
