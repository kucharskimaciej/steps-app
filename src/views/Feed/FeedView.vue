<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { Inject } from "vue-typedi";
import { FeedPresets, FeedService } from "@/views/Feed/feed.service";
import Feed from "@/components/Feed/Feed.vue";
import Container from "@/components/Layout/Container.vue";
import { Step } from "../../../common/types/Step";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import {
  getSteps,
  stepsById,
  stableStepIds,
  dispatchRecordView,
  dispatchSearch,
  getSearch,
  getIsSearchEmpty,
  dispatchClearSearch
} from "@/store";
import RecordPracticeWidget from "@/components/RecordPracticeWidget/RecordPracticeWidget.vue";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu.vue";
import { isEqual } from "lodash";
import SearchWidget from "@/components/SearchWidget/SearchWidget.vue";
import SearchOverlay from "@/components/SearchOverlay/SearchOverlay.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import { Search } from "@/components/FullSearch/types";

@Component({
  components: {
    Container,
    Feed,
    PureButton,
    PureIcon,
    AllStepsProvider,
    RecordPracticeWidget,
    DropdownMenu,
    SearchWidget,
    InlineModal,
    SearchOverlay
  }
})
export default class FeedView extends VueWithStore {
  @Inject() private readonly feedService!: FeedService;

  get stepIds() {
    return stableStepIds(this.$store);
  }

  @Watch("stepIds")
  handleStepsChange(newStepIds: string[], oldStepIds: string[]) {
    if (!isEqual(newStepIds, oldStepIds)) {
      this.selectStepsForFeed();
    }
  }

  handlePresetChange(preset: FeedPresets) {
    this.selectedPreset = preset;
    this.selectStepsForFeed();
    window.scrollTo(0, 0);
  }

  private selectStepsForFeed() {
    this.selectedStepIds = this.feedService.getStepIdsWithPreset(
      this.selectedPreset,
      getSteps(this.$store)
    );
  }

  selectedPreset = FeedPresets.LEAST_RECENTLY_VIEWED;
  presetLabels: Record<FeedPresets, string> = {
    [FeedPresets.RANDOM]: "Random",
    [FeedPresets.NEVER_PRACTICED]: "Never practiced",
    [FeedPresets.PRACTICED_ASC]: "Most recently practiced",
    [FeedPresets.PRACTICED_DESC]: "Least recently practiced",
    [FeedPresets.RECENTLY_ADDED]: "Recently added",
    [FeedPresets.LEAST_RECENTLY_VIEWED]: "Least recently viewed",
    [FeedPresets.LEAST_VIEWED]: "Least viewed"
  };
  presetOptions = Object.values(FeedPresets).map(value => ({
    value,
    label: this.presetLabels[value]
  }));
  selectedStepIds: string[] = [];

  get selectedSteps(): Step[] {
    const byId = stepsById(this.$store);
    return this.selectedStepIds.map(id => byId[id]);
  }

  handleStepViewed(stepId: string) {
    dispatchRecordView(this.$store, stepId);
  }

  searchOpen = false;

  get search(): Search {
    return getSearch(this.$store);
  }

  get hasActiveSearch(): boolean {
    return !getIsSearchEmpty(this.$store);
  }

  handleSearchChange(search: Search) {
    dispatchSearch(this.$store, search);
  }

  handleClearSearch() {
    dispatchClearSearch(this.$store);
  }
}
</script>

<template>
  <AllStepsProvider>
    <Container class="pb-4 ">
      <header
        class="flex justify-center px-2 py-2 sticky top-0 z-10 bg-mono-white border-b-1 border-b-mono-900"
      >
        <SearchWidget
          class="ml-auto"
          :search-active="hasActiveSearch"
          @click="searchOpen = true"
        />

        <InlineModal
          v-if="searchOpen"
          modal-style="OVERLAY"
          @close-modal="searchOpen = false"
        >
          <SearchOverlay
            :search="search"
            @search-change="handleSearchChange"
            @clear-search="handleClearSearch"
            @close-modal="searchOpen = false"
          />
        </InlineModal>
      </header>
      <Feed :steps="selectedSteps" @step-viewed="handleStepViewed">
        <template #stepActions="{ step }">
          <RecordPracticeWidget :step-id="step.id" />
        </template>
      </Feed>
    </Container>
  </AllStepsProvider>
</template>
