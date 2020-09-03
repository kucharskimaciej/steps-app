import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";
import { stepsFactory } from "@/stories/fixtures/steps";
import Feed from "@/components/Feed/Feed.vue";
import StoryRouter from "storybook-vue-router";
import { ROUTES } from "@/router";

export default {
  title: "Components/Feed/Feed",
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
      Feed
    },
    data: () => ({
      steps: stepsFactory()
    }),
    template: `
      <Feed :steps="steps"/>`
  });

export const WithCustomAction: () => Component = () =>
  Vue.extend({
    components: {
      Feed
    },
    data: () => ({
      steps: stepsFactory()
    }),
    methods: {
      handler: action("clicked")
    },
    template: `
      <Feed :steps="steps">
      <template #stepActions="{step}">
        <span @click="handler(step.id)">Do it</span>
      </template>
      </Feed>`
  });
