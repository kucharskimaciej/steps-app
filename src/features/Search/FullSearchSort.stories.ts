import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import FullSearchSort from "@/features/Search/FullSearchSort.vue";
import { SortDirection, SortType } from "@/features/Search/types";

export default {
  title: "Components/FullSearch/Sort",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const BasicUsage: () => Component = () => ({
  components: {
    FullSearchSort
  },
  template: `
    <section>
      <FullSearchSort v-model="sort" />
      <pre>{{ sort }}</pre>
    </section>
  `,
  methods: {
    onSortChange(sort) {
      console.log("sort", sort);
      (this as any).sort = sort;
    }
  },
  data: () => ({
    sort: {
      type: SortType.SCORE,
      direction: SortDirection.DESCENDING
    }
  }),
  props: {}
});
