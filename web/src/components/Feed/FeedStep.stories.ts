import { withKnobs } from "@storybook/addon-knobs";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";
import FeedStep from "@/components/Feed/FeedStep.vue";
import { stepFactory } from "@/stories/fixtures/steps";

export default {
  title: "Components/Feed/Step",
  decorators: [withKnobs, Container("600px"), Spacing, WithGlobalStyles]
};

export const Default: () => Component = () =>
  Vue.extend({
    components: {
      FeedStep
    },
    data: () => ({
      step: stepFactory()
    }),
    template: `<FeedStep :step="step"/>`
  });
