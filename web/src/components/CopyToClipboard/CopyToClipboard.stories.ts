import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import { stepFactory } from "@/stories/fixtures/steps";
import StoryRouter from "storybook-vue-router";
import { ROUTES } from "@/router/routes";

export default {
  title: "Components/CopyToClipboard",
  decorators: [
    (StoryRouter as any)(
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
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground
  ]
};

export const Default: () => Component = () => ({
  components: {
    CopyToClipboard
  },
  template: `<CopyToClipboard :value="step | shortLink($router)" />`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});
