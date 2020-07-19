import { withKnobs } from "@storybook/addon-knobs";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";
import { stepsFactory } from "@/stories/fixtures/steps";
import Feed from "@/components/Feed/Feed.vue";

export default {
  title: "Components/Feed/Feed",
  decorators: [withKnobs, Container("600px"), Spacing, WithGlobalStyles]
};

export const Default: () => Component = () =>
  Vue.extend({
    components: {
      Feed
    },
    data: () => ({
      steps: stepsFactory()
    }),
    template: `<Feed :steps="steps"/>`
  });
