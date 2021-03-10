<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { Inject } from "vue-typedi";
import { FeedPresets, FeedService } from "@/views/Feed/feed.service";
import Feed from "@/components/Feed/Feed.vue";
import Container from "@/components/Layout/Container.vue";
import { Step } from "../../../../common/types/Step";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider";
import { getSteps, stepsById, stableStepIds } from "@/store";
import RecordPracticeWidget from "@/components/RecordPracticeWidget/RecordPracticeWidget.vue";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu.vue";
import { isEqual } from "lodash";

@Component({
  components: {
    Container,
    Feed,
    PureButton,
    PureIcon,
    AllStepsProvider,
    RecordPracticeWidget,
    DropdownMenu
  }
})
export default class FeedView extends VueWithStore {
  @Inject() private readonly feedService!: FeedService;

  get stepIds() {
    return stableStepIds(this.$store);
  }

  @Watch("stepIds")
  handleStepsChange(newStepIds, oldStepIds) {
    if (!isEqual(newStepIds, oldStepIds)) {
      this.selectStepsForFeed();
    }
  }

  handlePresetChange(preset: FeedPresets) {
    this.selectedPreset = preset;
    this.selectStepsForFeed();
  }

  private selectStepsForFeed() {
    this.selectedStepIds = this.feedService.getStepIdsWithPreset(
      this.selectedPreset,
      getSteps(this.$store)
    );
  }

  selectedPreset = FeedPresets.RANDOM;
  presetLabels: Record<FeedPresets, string> = {
    [FeedPresets.RANDOM]: "Random",
    [FeedPresets.NEVER_PRACTICED]: "Never practiced",
    [FeedPresets.PRACTICED_ASC]: "Most recently practiced",
    [FeedPresets.PRACTICED_DESC]: "Least recently practiced",
    [FeedPresets.RECENTLY_ADDED]: "Recently added"
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
}
</script>

<template>
  <AllStepsProvider>
    <Container class="pt-2 pb-4">
      <header class="mx-2 mb-2">
        <DropdownMenu
          :value="selectedPreset"
          :options="presetOptions"
          @input="handlePresetChange"
        />
      </header>
      <Feed :steps="selectedSteps">
        <template #stepActions="{ step }">
          <RecordPracticeWidget :step-id="step.id" />
        </template>
      </Feed>
    </Container>
  </AllStepsProvider>
</template>
