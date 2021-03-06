import { withKnobs } from "@storybook/addon-knobs";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";
import FeedStep from "@/components/Feed/FeedStep.vue";
import { stepFactory } from "@/stories/fixtures/steps";
import StoryRouter from "storybook-vue-router";
import { ROUTES } from "@/router";
import PureButton from "@/components/PureButton/PureButton.vue";

export default {
  title: "Components/Feed/Step",
  decorators: [
    StoryRouter(
      {},
      {
        routes: [
          {
            name: ROUTES.PUBLIC_STEP,
            path: "/s/:stepId"
          }
        ]
      }
    ),
    withKnobs,
    Container("600px"),
    Spacing,
    WithGlobalStyles
  ]
};

export const Default: () => Component = () =>
  Vue.extend({
    components: {
      FeedStep
    },
    data: () => ({
      step: stepFactory()
    }),
    template: `
      <FeedStep :step="step"/>`
  });

export const CustomAction: () => Component = () =>
  Vue.extend({
    components: {
      FeedStep,
      PureButton
    },
    data: () => ({
      step: stepFactory()
    }),
    template: `
      <FeedStep :step="step">
        <template #actions>
          <PureButton feel="ghost">Only action</PureButton>
        </template>
      </FeedStep>`
  });

export const MultipleCustomActions: () => Component = () =>
  Vue.extend({
    components: {
      FeedStep,
      PureButton
    },
    data: () => ({
      step: stepFactory()
    }),
    template: `
      <FeedStep :step="step">
        <template #actions>
          <PureButton feel="ghost">Action 1</PureButton>
          <PureButton feel="ghost">Action 2</PureButton>
        </template>
      </FeedStep>`
  });
