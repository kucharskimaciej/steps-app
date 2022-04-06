import { storiesOf } from "@storybook/vue";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
} from "@/stories/decorators";
import PureStepList from "@/components/StepList/PureStepList.vue";
import StoryRouter from "storybook-vue-router";
import { stepsFactory } from "@/stories/fixtures/steps";

const stories = storiesOf("Components/PureStepList", module)
  .addDecorator((StoryRouter as any)())
  .addDecorator(Container("900px", "600px"))
  .addDecorator(WithGlobalStyles)
  .addDecorator(Spacing)
  .addDecorator(NeutralBackground);

stories.add("Basic display", () => {
  const list = [...stepsFactory()];
  return {
    components: { PureStepList },
    template: '<PureStepList :steps="list" :is-selected="isSelected"/>',
    data: () => ({
      list,
    }),
    methods: {
      isSelected: () => false,
    },
  };
});

stories.add("With scroll", () => {
  const list = [...stepsFactory(), ...stepsFactory(), ...stepsFactory()];
  return {
    components: { PureStepList },
    template: `<PureStepList :steps="list" :is-selected="isSelected"/>`,
    data: () => ({
      list,
    }),
    methods: {
      isSelected: () => false,
    },
  };
});
