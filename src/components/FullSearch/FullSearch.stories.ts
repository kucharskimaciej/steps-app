import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import FullSearch from "@/components/FullSearch/FullSearch.vue";

export default {
  title: "Components/FullSearch/FullSearch",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    FullSearch
  },
  template: `
  <section>
    <FullSearch :value="search" @search="handleSearchChange" />
    <pre>{{search}}</pre>
  </section>`,
  methods: {
    handleSearchChange(newSearch) {
      (this as any).search = newSearch;
    }
  },
  data: () => ({
    search: {}
  }),
  props: {}
});
