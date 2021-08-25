<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";
import FullSearch from "@/components/FullSearch/FullSearch.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import { existingArtists, existingTags } from "@/store";
import { Search } from "@/components/FullSearch/types";

@Component({
  components: {
    FullSearch,
    PureButton
  }
})
export default class SearchOverlay extends Vue {
  @Prop() private search!: Search;

  @Emit()
  closeModal() {}

  @Emit()
  searchChange(search: Search) {
    return search;
  }

  @Emit()
  clearSearch() {}

  get existingTags() {
    return existingTags(this.$store);
  }

  get existingArtists() {
    return existingArtists(this.$store);
  }
}
</script>

<template>
  <div class="h-full pt-4">
    <FullSearch
      :value="search"
      :existing-artists="existingArtists"
      :existing-tags="existingTags"
      @search="searchChange"
    />
    <footer class="flex justify-center">
      <PureButton kind="outline" class="mr-2" @click="clearSearch">
        Clear
      </PureButton>
      <PureButton @click="closeModal()">Back to results</PureButton>
    </footer>
  </div>
</template>
