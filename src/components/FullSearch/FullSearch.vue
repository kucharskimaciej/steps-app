<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import {
  Search,
  SearchFilters,
  SearchSort
} from "@/components/FullSearch/types";
import FullSearchFilters from "@/components/FullSearch/FullSearchFilters.vue";
import FullSearchSort from "@/components/FullSearch/FullSearchSort.vue";

@Component({
  components: {
    FullSearchFilters,
    FullSearchSort
  }
})
export default class FullSearch extends Vue {
  @Prop({
    default: () => ({})
  })
  private value!: Search;
  @Prop({ default: () => [] }) private existingTags!: string[];
  @Prop({ default: () => [] }) private existingArtists!: string[];

  @Emit("search")
  handleFiltersChange(filters: SearchFilters) {
    return {
      ...this.value,
      filters
    };
  }

  @Emit("search")
  handleSortChange(sort: SearchSort) {
    return {
      ...this.value,
      sort
    };
  }
}
</script>

<template>
  <section class="w-full">
    <FullSearchFilters
      :existing-tags="existingTags"
      :existing-artists="existingArtists"
      :filters="value.filters"
      @input="handleFiltersChange"
    />
    <FullSearchSort :sort="value.sort" @input="handleSortChange" />
  </section>
</template>
