import { withKnobs } from "@storybook/addon-knobs";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";

export default {
  title: "Components/",
  decorators: [withKnobs, Container("600px"), Spacing, WithGlobalStyles]
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
