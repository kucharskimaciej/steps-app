import { withKnobs } from "@storybook/addon-knobs";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";

export default {
  title: "Components/Providers",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    // DarkBackground,
    WithGlobalStyles
  ]
};

export const Base: () => Component = () =>
  Vue.extend({
    components: {},
    props: {},
    data: () => ({
      muted: false
    }),
    methods: {},
    template: ``
  });
