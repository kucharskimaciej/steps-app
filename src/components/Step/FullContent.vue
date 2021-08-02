<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import StepTitle from "@/components/Step/components/StepTitle.vue";
import StepVideoLinks from "@/components/Step/components/VideoLinks.vue";
import Tags from "@/components/Step/components/Tags.vue";
import Variations from "@/components/Step/components/Variations.vue";
import { VideoObject } from "../../../common/types/VideoObject";
import InlineModal from "@/components/Modal/InlineModal.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";

@Component({
  components: {
    StepTitle,
    StepVideoLinks,
    Tags,
    Variations,
    InlineModal,
    VideoModal
  }
})
export default class FullContent extends Vue {
  @Prop() private step!: Step;

  get firstVideo(): VideoObject {
    const [firstVideo] = this.step.videos;
    return firstVideo;
  }

  openVideo: VideoObject | null = null;
}
</script>

<template>
  <main>
    <header class="mb-2">
      <StepTitle
        :step="step"
        link-to-video
        @click.native="openVideo = firstVideo"
      />
      <StepVideoLinks
        :step="step"
        skip-first
        @open-video="openVideo = $event"
      />
    </header>

    <Tags :step="step" category="meta" class="mb-1" />
    <Tags :step="step" category="content" class="mb-2" />

    <section v-if="step.variations.length > 0" class="text-sm">
      <h2 class="font-semibold">
        Variations
      </h2>
      <Variations :step="step" />
    </section>

    <InlineModal
      v-if="openVideo"
      :modal-style="$modalStyle.BORDERLESS"
      @close-modal="openVideo = null"
    >
      <VideoModal :video="openVideo" />
    </InlineModal>
  </main>
</template>
