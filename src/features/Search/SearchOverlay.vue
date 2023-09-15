<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Search } from "@/features/Search/types";
import FullSearch from "@/features/Search/FullSearch.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import { existingTags, existingArtists, useStore } from "@/store";

const SearchOverlay = defineComponent({
  components: {
    FullSearch,
    PureButton,
  },
  props: {
    search: {
      type: Object as PropType<Search>,
    },
  },
  emits: ["search-change", "close-modal", "clear-search"],
  setup() {
    const store = useStore();

    const artists = computed(() => existingArtists(store));
    const tags = computed(() => existingTags(store));

    return {
      artists,
      tags,
    };
  },
});

export default SearchOverlay;
</script>

<template>
  <div class="h-full pt-4">
    <FullSearch
      :value="search"
      :existing-artists="artists"
      :existing-tags="tags"
      @search="$emit('search-change', $event)"
    />
    <footer class="flex justify-center">
      <PureButton kind="outline" class="mr-2" @click="$emit('clear-search')">
        Clear
      </PureButton>
      <PureButton @click="$emit('close-modal')">Back to results</PureButton>
    </footer>
  </div>
</template>
