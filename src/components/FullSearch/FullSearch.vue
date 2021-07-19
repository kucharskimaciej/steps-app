<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import {
  Search,
  SearchFilters,
  SearchSort
} from "@/components/FullSearch/types";
import FullSearchFilters from "@/components/FullSearch/FullSearchFilters.vue";
import FullSearchSort from "@/components/FullSearch/FullSearchSort.vue";
import { DebounceTime } from "@/lib/decorators/debouceTime";
import PureButton from "@/components/PureButton/PureButton.vue";
import { Tag } from "../../../common/types/Tag";

@Component({
  components: {
    PureButton,
    FullSearchFilters,
    FullSearchSort
  }
})
export default class FullSearch extends Vue {
  @Prop({
    default: () => ({})
  })
  private value!: Search;
  @Prop({ default: () => [] }) private existingTags!: Tag[];
  @Prop({ default: () => [] }) private existingArtists!: string[];

  @Emit("search")
  @DebounceTime(200)
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
    <pre>{{ value.filters }}</pre>
    <FullSearchFilters
      :existing-tags="existingTags"
      :existing-artists="existingArtists"
      :value="value.filters"
      @input="handleFiltersChange"
    />
    <FullSearchSort :value="value.sort" @input="handleSortChange" />
  </section>
</template>
