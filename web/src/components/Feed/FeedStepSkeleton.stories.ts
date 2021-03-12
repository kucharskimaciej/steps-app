import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import FeedStepSkeleton from "@/components/Feed/FeedStepSkeleton.vue";

export default {
  title: "Components/Feed/FeedStepSkeleton",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    FeedStepSkeleton
  },
  template: `
    <FeedStepSkeleton />
  `,
  methods: {},
  data: () => ({}),
  props: {}
});

export const CustomHeight: () => Component = () => ({
  components: {
    FeedStepSkeleton
  },
  template: `
    <FeedStepSkeleton :height="height" />
  `,
  methods: {},
  data: () => ({
    height: "900px"
  }),
  props: {}
});
