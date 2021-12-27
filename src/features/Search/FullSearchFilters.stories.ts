import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import FullSearchFilters from "@/features/Search/FullSearchFilters.vue";

export default {
  title: "Components/FullSearch/Filters",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Playground: () => Component = () => ({
  components: {
    FullSearchFilters
  },
  template: `<section>
    <FullSearchFilters :existing-tags="tags" :existing-artists="artists" @input="onSearchChange" />
    <pre>{{ search }}</pre>
  </section>`,
  methods: {
    onSearchChange(search) {
      console.log("search", search);
      (this as any).search = search;
    }
  },
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"],
    artists: ["Nowak & Majchrowska", "Ricardo & Paula", "Tomek & Marzena"],
    search: {}
  }),
  props: {}
});
