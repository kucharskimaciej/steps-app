import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import Tags from "@/components/Step/components/Tags.vue";
import { stepFactory } from "@/stories/fixtures/steps";

export default {
  title: "Components/Step/Components/Tags",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    Tags
  },
  template: `<Tags :step="step" />`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const MetaOnly: () => Component = () => ({
  components: {
    Tags
  },
  template: `<Tags :step="step" category="meta" />`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});

export const ContentOnly: () => Component = () => ({
  components: {
    Tags
  },
  template: `<Tags :step="step" category="content" />`,
  methods: {},
  data: () => ({
    step: stepFactory()
  }),
  props: {}
});
