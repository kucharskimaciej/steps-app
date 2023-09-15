<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import StepActions from "@/views/Feed/components/StepActions.vue";
import Container from "@/components/Layout/Container.vue";
import Feed from "@/features/Feed/StepsFeed.vue";
import FeedStep from "@/features/Feed/FeedStep.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import SearchWidget from "@/features/Search/SearchWidget.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import SearchOverlay from "@/features/Search/SearchOverlay.vue";
import Badge from "@/components/Badge/Badge.vue";
import TheTopBarContainer from "@/components/TheTopBar/TheTopBarContainer.vue";
import {
  dispatchClearSearch,
  dispatchRecordView,
  dispatchSearch,
  getIsSearchEmpty,
  getSearch,
  getStepsMatchingSearch,
  stableStepIds,
  stepsById,
  useStore,
} from "@/store";
import { isEqual } from "lodash";
import { Step } from "../../../common/types/Step";
import { Search } from "@/features/Search/types";

const FeedView = defineComponent({
  components: {
    StepActions,
    Container,
    Feed,
    FeedStep,
    AllStepsProvider,
    SearchWidget,
    InlineModal,
    SearchOverlay,
    Badge,
    TheTopBarContainer,
  },
  setup() {
    const store = useStore();
    const selectedStepIds = ref<string[]>([]);
    const searchOpen = ref(false);

    const stepIds = computed(() => stableStepIds(store));
    const selectedSteps = computed((): Step[] => {
      const byId = stepsById(store);
      return selectedStepIds.value.map((id) => byId[id]);
    });
    const search = computed(() => getSearch(store));
    const hasActiveSearch = computed(() => !getIsSearchEmpty(store));

    function selectStepsForFeed() {
      selectedStepIds.value = getStepsMatchingSearch(store);
    }

    function handleStepViewed(stepId: string) {
      dispatchRecordView(store, stepId);
    }

    function handleSearchChange(search: Search) {
      console.log("before dispatch of serach change", search);
      dispatchSearch(store, search);
      onSearchChange();
    }

    function handleClearSearch() {
      dispatchClearSearch(store);
      onSearchChange();
    }

    function onSearchChange() {
      selectStepsForFeed();
      window.scrollTo(0, 0);
    }

    watch(
      stepIds,
      (newStepIds, oldStepIds) => {
        if (!isEqual(newStepIds, oldStepIds)) {
          selectStepsForFeed();
        }
      },
      { immediate: true }
    );

    return {
      selectedStepIds,
      selectedSteps,
      searchOpen,
      search,
      hasActiveSearch,
      handleStepViewed,
      handleSearchChange,
      handleClearSearch,
      selectStepsForFeed,
    };
  },
});

export default FeedView;
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
