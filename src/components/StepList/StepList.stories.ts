import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
} from "@/stories/decorators";
import StepList from "@/components/StepList/StepList.vue";
import { stepsFactory } from "@/stories/fixtures/steps";
import { Step } from "../../../common/types/Step";

export default {
  title: "Components/StepList/List",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
  ],
};

export const Default: () => Component = () => ({
  components: {
    StepList,
  },
  template: `
    <StepList :steps="steps" @active-step-change="changeActiveStep" @toggle="handleToggle" :is-selected="isSelected" :is-active="isActive"/>
  `,
  methods: {
    changeActiveStep(this: any, stepId: string) {
      this.activeStepId = stepId;
    },
    handleToggle(this: any, stepId: string) {
      if (this.selectedSteps.includes(stepId)) {
        this.selectedSteps = this.selectedSteps.filter(
          (id: string) => id !== stepId
        );
      } else {
        this.selectedSteps.push(stepId);
      }
    },
    isActive(this: any, step: Step) {
      return this.activeStepId === step.id;
    },
    isSelected(this: any, step: Step) {
      return this.selectedSteps.includes(step.id);
    },
  },
  data: () => ({
    steps: stepsFactory(),
    activeStepId: "",
    selectedSteps: [],
  }),
  props: {},
});
