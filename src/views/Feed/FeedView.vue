<script lang="ts">
import StepActions from "@/views/Feed/components/StepActions.vue";
import { Component, Watch } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import Feed from "@/features/Feed/Feed.vue";
import Container from "@/components/Layout/Container.vue";
import { Step } from "../../../common/types/Step";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import {
  stepsById,
  dispatchRecordView,
  dispatchSearch,
  getSearch,
  getIsSearchEmpty,
  dispatchClearSearch,
  getStepsMatchingSearch,
  stableStepIds
} from "@/store";
import RecordPracticeWidget from "@/components/RecordPracticeWidget/RecordPracticeWidget.vue";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu.vue";
import { isEqual } from "lodash";
import SearchWidget from "@/features/Search/SearchWidget.vue";
import SearchOverlay from "@/features/Search/SearchOverlay.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import { Search } from "@/features/Search/types";
import Badge from "@/components/Badge/Badge.vue";
import FeedStep from "@/features/Feed/FeedStep.vue";
import TheTopBarContainer from "@/components/TheTopBar/TheTopBarContainer.vue";

@Component({
  components: {
    StepActions,
    Container,
    Feed,
    FeedStep,
    PureButton,
    PureIcon,
    AllStepsProvider,
    RecordPracticeWidget,
    DropdownMenu,
    SearchWidget,
    InlineModal,
    SearchOverlay,
    Badge,
    TheTopBarContainer
  }
})
export default class FeedView extends VueWithStore {
  selectedStepIds: string[] = [];

  selectStepsForFeed() {
    this.selectedStepIds = getStepsMatchingSearch(this.$store);
  }

  get stepIds() {
    return stableStepIds(this.$store);
  }

  @Watch("stepIds", { immediate: true })
  handleStepsChange(newStepIds: string[], oldStepIds: string[]) {
    if (!isEqual(newStepIds, oldStepIds)) {
      this.selectStepsForFeed();
    }
  }

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
    this.onSearchChange();
  }

  handleClearSearch() {
    dispatchClearSearch(this.$store);
    this.onSearchChange();
  }

  private onSearchChange() {
    this.selectStepsForFeed();
    window.scrollTo(0, 0);
  }
}
</script>

<template>
  <AllStepsProvider>
    <div>
      <TheTopBarContainer>
        <template #right>
          <SearchWidget
            :search-active="hasActiveSearch"
            @click="searchOpen = true"
          >
            <template #activeSearch>
              <Badge class="ml-2">
                {{ selectedStepIds.length }}
              </Badge>
            </template>
          </SearchWidget>

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
        </template>
      </TheTopBarContainer>
      <Container class="pb-4">
        <Feed :steps="selectedSteps" page-mode>
          <template #default="{ step, videoHeight }">
            <FeedStep
              :step="step"
              :video-height="videoHeight"
              @viewed="handleStepViewed(step.id)"
            >
              <template #actions>
                <StepActions :step="step" class="mb-2" />
              </template>
            </FeedStep>
          </template>
        </Feed>
      </Container>
    </div>
  </AllStepsProvider>
</template>
