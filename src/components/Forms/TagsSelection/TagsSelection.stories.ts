import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import TagsSelection from "@/components/Forms/TagsSelection/TagsSelection.vue";

export default {
  title: "Components/Forms/TagsSelection",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const BasicUsage: () => Component = () => ({
  components: {
    TagsSelection
  },
  template: `<section>
    <TagsSelection :tags="tags" v-model="value" />
    <pre>{{ value }}</pre>
  </section>`,
  methods: {},
  data: () => ({
    tags: [{ text: "One" }, { text: "Two" }, { text: "Three" }],
    value: []
  }),
  props: {}
});
