import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import SessionCard from "@/components/Sessions/SessionCard.vue";
import { makeSession } from "@/stories/fixtures/sessions";
import StoryRouter from "storybook-vue-router";
import { ROUTES } from "@/router";

export default {
  title: "Components/Sessions/SessionCard",
  decorators: [
    (StoryRouter as any)(
      {},
      {
        routes: [
          {
            name: ROUTES.SESSION,
            path: "/session/:stepId"
          }
        ]
      }
    ),
    Container("300px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground
  ]
};

export const Default: () => Component = () => ({
  components: {
    SessionCard
  },
  template: `<SessionCard :session="session" />`,
  methods: {},
  data: () => ({
    session: makeSession()
  }),
  props: {}
});

export const Empty: () => Component = () => ({
  components: {
    SessionCard
  },
  template: `<SessionCard :session="session" />`,
  methods: {},
  data: () => ({
    session: makeSession({ steps: 0 })
  }),
  props: {}
});

export const LongName: () => Component = () => ({
  components: {
    SessionCard
  },
  template: `<SessionCard :session="session" />`,
  methods: {},
  data: () => ({
    session: makeSession({ longName: true })
  }),
  props: {}
});

export const Closed: () => Component = () => ({
  components: {
    SessionCard
  },
  template: `<SessionCard :session="session" />`,
  methods: {},
  data: () => ({
    session: makeSession({ closed: true })
  }),
  props: {}
});

export const ClosedWithLongName: () => Component = () => ({
  components: {
    SessionCard
  },
  template: `<SessionCard :session="session" />`,
  methods: {},
  data: () => ({
    session: makeSession({ closed: true, longName: true })
  }),
  props: {}
});
