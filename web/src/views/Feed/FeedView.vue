<script lang="ts">
import { Component } from "vue-property-decorator";
import { VueWithStore } from "@/lib/vueWithStore";
import { Inject } from "vue-typedi";
import { FeedService } from "@/views/Feed/feed.service";
import Feed from "@/components/Feed/Feed.vue";
import Container from "@/components/Layout/Container.vue";
import { Step } from "../../../../common/types/Step";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import AllStepsProvider from "@/components/Providers/AllStepsProvider.vue";
import { getSteps } from "@/store";

@Component({
  components: {
    Container,
    Feed,
    PureButton,
    PureIcon,
    AllStepsProvider
  }
})
export default class FeedView extends VueWithStore {
  @Inject() private readonly feedService!: FeedService;

  steps: Step[] = this.feedService.getStepsForFeed(getSteps(this.$store));

  stepsWatcher!: () => void;

  created() {
    this.stepsWatcher = this.$store.watch(
      () => getSteps(this.$store),
      steps => {
        this.steps = this.feedService.getStepsForFeed(steps);
      }
    );
  }

  beforeDestroy() {
    this.stepsWatcher();
  }

  refresh() {
    this.steps = this.feedService.getStepsForFeed(getSteps(this.$store));
    window.scrollTo(0, 0);
  }
}
</script>

<template>
  <AllStepsProvider>
    <Container class="pt-5 pb-10">
      <Feed :steps="steps" />
      <footer class="text-center mt-5">
        <PureButton spacing="wide" size="large" @click="refresh">
          <PureIcon type="refresh" /> Refresh
        </PureButton>
      </footer>
    </Container>
  </AllStepsProvider>
</template>
