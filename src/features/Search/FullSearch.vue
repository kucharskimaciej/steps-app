<script lang="ts">
import { defineComponent, PropType } from "vue";
import FullSearchFilters from "@/features/Search/FullSearchFilters.vue";
import FullSearchSort from "@/features/Search/FullSearchSort.vue";
import { Search, SearchFilters, SearchSort } from "@/features/Search/types";

const FullSearch = defineComponent({
  components: {
    FullSearchFilters,
    FullSearchSort,
  },
  props: {
    value: {
      type: Object as PropType<Search>,
      default: () => ({}),
    },
    existingTags: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    existingArtists: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ["search"],
  setup(props, ctx) {
    function handleSortChange(sort: SearchSort) {
      ctx.emit("search", {
        ...props.value,
        sort,
      });
    }

    function handleFiltersChange(filters: SearchFilters) {
      ctx.emit("search", {
        ...props.value,
        filters,
      });
    }

    return {
      handleFiltersChange,
      handleSortChange,
    };
  },
});

export default FullSearch;
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
