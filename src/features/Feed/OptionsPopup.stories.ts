import { Component } from "vue";
import { action } from "@storybook/addon-actions";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
  WithModals,
} from "@/stories/decorators";
import OptionsPopup from "@/features/Feed/OptionsPopup.vue";
import { stepFactory } from "@/stories/fixtures/steps";
import StoryRouter from "storybook-vue-router";
import { ROUTES } from "@/router";

export default {
  title: "Components/Feed/OptionsPopup",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
    WithModals,
    StoryRouter(
      {},
      {
        routes: [
          {
            name: ROUTES.PUBLIC_STEP,
            path: "/s/:stepId",
          },
          {
            name: ROUTES.EDIT_STEP,
            path: "/edit/:stepId",
          },
        ],
      }
    ),
  ],
};

export const BasicUsage: () => Component = () => ({
  components: {
    OptionsPopup,
  },
  template: `<OptionsPopup :step="step" />`,
  methods: {
    itemClick: action("ITEM_CLICK"),
  },
  data: () => ({
    step: stepFactory(),
  }),
  props: {},
});
