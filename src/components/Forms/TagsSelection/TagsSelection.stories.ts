import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
} from "@/stories/decorators";
import TagsSelection from "@/components/Forms/TagsSelection/TagsSelection.vue";

export default {
  title: "Components/Forms/TagsSelection",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
  ],
};

export const BasicUsage: () => Component = () => ({
  components: {
    TagsSelection,
  },
  template: `<section>
    <TagsSelection :options="options" v-model="value" />
    <pre class="mt-2">{{ value }}</pre>
  </section>`,
  methods: {},
  data: () => ({
    options: [
      { key: "one", label: "One" },
      { key: "two", label: "Two" },
      { key: "three", label: "Three" },
    ],
    value: [],
  }),
  props: {},
});

export const WithValueProvided: () => Component = () => ({
  components: {
    TagsSelection,
  },
  template: `<section>
    <TagsSelection :options="options" v-model="value" />
    <pre class="mt-2">{{ value }}</pre>
  </section>`,
  methods: {},
  data: () => ({
    options: [
      { key: "one", label: "One" },
      { key: "two", label: "Two" },
      { key: "three", label: "Three" },
    ],
    value: [["one", 1]],
  }),
  props: {},
});
