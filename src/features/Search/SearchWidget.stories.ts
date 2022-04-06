import { Component } from "vue";
import {
  Spacing,
  WithGlobalStyles,
  Container,
  NeutralBackground,
} from "@/stories/decorators";
import SearchWidget from "@/features/Search/SearchWidget.vue";

export default {
  title: "Components/SearchWidget",
  decorators: [
    Container("600px"),
    Spacing,
    NeutralBackground,
    WithGlobalStyles,
  ],
};

export const Default: () => Component = () => ({
  components: {
    SearchWidget,
  },
  template: `
      <SearchWidget />
    `,
  methods: {},
  data: () => ({}),
  props: {},
});

export const WithActiveSearch: () => Component = () => ({
  components: {
    SearchWidget,
  },
  template: `
      <SearchWidget search-active />
    `,
  methods: {},
  data: () => ({}),
  props: {},
});
