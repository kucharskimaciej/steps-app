import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import StepListStep from "@/components/StepList/StepListStep.vue";
import { stepFactory } from "@/stories/fixtures/steps";
import SelectToggleWidget from "@/components/SelectToggleWidget/SelectToggleWidget.vue";

export default {
  title: "Components/StepList/StepListStep",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    StepListStep
  },
  template: `
    <StepListStep :step="step" />
  `,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const Selected: () => Component = () => ({
  components: {
    StepListStep
  },
  template: `
    <StepListStep :step="step" :is-selected="true"/>
  `,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const Active: () => Component = () => ({
  components: {
    StepListStep
  },
  template: `
    <StepListStep :step="step" :is-active="true"/>
  `,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const WithWidget: () => Component = () => ({
  components: {
    StepListStep,
    SelectToggleWidget
  },
  template: `
    <StepListStep :step="step">
      <template #before>
        <SelectToggleWidget />
      </template>
    </StepListStep>
  `,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});
