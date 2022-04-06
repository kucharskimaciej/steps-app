import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
} from "@/stories/decorators";
import Sessions from "@/components/Sessions/Sessions.vue";
import { sessionsFactory } from "@/stories/fixtures/sessions";
import StoryRouter from "storybook-vue-router";
import { ROUTES } from "@/router";

export default {
  title: "Components/Sessions",
  decorators: [
    (StoryRouter as any)(
      {},
      {
        routes: [
          {
            name: ROUTES.SESSION,
            path: "/session/:stepId",
          },
        ],
      }
    ),
    Container("800px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
  ],
};

export const Default: () => Component = () => ({
  components: {
    Sessions,
  },
  template: `<Sessions :sessions="sessions"/>`,
  methods: {},
  data: () => ({
    sessions: sessionsFactory(),
  }),
  props: {},
});
