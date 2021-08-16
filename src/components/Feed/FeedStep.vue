<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import FeedActions from "@/components/Feed/FeedActions.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import Tags from "@/components/Step/components/Tags.vue";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";

@Component({
  components: {
    VideoPlayer,
    PureTag,
    CopyToClipboard,
    FeedActions,
    PureIcon,
    PureButton,
    Tags,
    IntersectSwitch,
    VideoModal
  }
})
export default class FeedStep extends Vue {
  @Ref("videoModal") readonly videoModal!: VideoModal;
  @Prop({ required: true }) private step!: Step;
  @Prop() private autoplay!: boolean;

  get anchor() {
    return `step-${this.step.id}`;
  }

  get primaryVideo() {
    return this.step.videos[0];
  }

  @Emit("viewed")
  handleViewed() {}

  width = 0;
  mounted() {
    this.width = this.$el.clientWidth;
  }

  get scaledVideoHeight(): number {
    const { height, width } = this.primaryVideo;
    if (!height || !width || !this.width) {
      return 400;
    }

    const scaleRatio = this.width / width;
    return scaleRatio * height;
  }
}
</script>

<template>
  <article :id="anchor" class="bg-white overflow-hidden">
    <main
      class="video-container mb-2"
      :style="{
        height: scaledVideoHeight ? `${scaledVideoHeight}px` : 'auto',
        maxHeight: `60vh`
      }"
    >
      <IntersectSwitch :threshold="[0, 0.3, 0.5, 0.6, 0.8, 1]">
        <template #default="{ visible }">
          <div class="w-full h-full">
            <VideoPlayer
              v-if="visible"
              :autoplay="!$match('desktop')"
              :video="primaryVideo"
              size-control
              @viewed="handleViewed"
              @open-full-size="videoModal.openModal(primaryVideo)"
            />

            <div v-else class="w-full bg-mono-800 h-full"></div>
          </div>
        </template>
      </IntersectSwitch>
    </main>
    <header class="px-2 mb-2 flex">
      <h2 class="text-mono-100 font-normal mr-auto">
        {{ step.name }}
      </h2>

      <CopyToClipboard
        :value="step | shortLink($router)"
        class="ml-auto self-start"
      >
        Shareable link
        <PureIcon class="self-center ml-1" type="content_copy" />
      </CopyToClipboard>
    </header>
    <footer class="px-2 mb-2">
      <FeedActions class="mb-2">
        <slot name="actions" :step="step" />
      </FeedActions>
      <section class="-mt-1">
        <Tags :step="step" />
      </section>
    </footer>
    <VideoModal ref="videoModal" />
  </article>
</template>

<style scoped>
.video-container {
  height: auto;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}
</style>
