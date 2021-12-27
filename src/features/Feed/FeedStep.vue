<script lang="ts">
import { VueWithStore } from "@/lib/vueWithStore";
import { Component, Prop, Emit } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import VideoPlayer from "@/features/VideoPlayer/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import FeedActions from "@/features/Feed/FeedActions.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import Tags from "@/components/Step/components/Tags.vue";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import ProvideVideoModal from "@/components/Providers/ProvideVideoModal.vue";
import OptionsPopup from "@/features/Feed/OptionsPopup.vue";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";
import Badge from "@/components/Badge/Badge.vue";

@Component({
  components: {
    Feed: () => import("@/features/Feed/Feed.vue"),
    VideoPlayer,
    PureTag,
    OptionsPopup,
    PopupMenuItem,
    FeedActions,
    PureIcon,
    PureButton,
    Tags,
    IntersectSwitch,
    ProvideVideoModal,
    Badge
  }
})
export default class FeedStep extends VueWithStore {
  @Prop({ required: true }) private step!: Step;
  @Prop() private autoplay!: boolean;
  @Prop({ default: true }) private showVariations!: boolean;
  @Prop({ default: false }) private practiceActions!: boolean;

  get anchor() {
    return `step-${this.step.id}`;
  }

  get primaryVideo() {
    return this.step.videos[0];
  }

  @Emit("viewed")
  handleViewed() {}

  @Emit()
  edit() {}

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
  <article :id="anchor" class="bg-mono-white rounded-sm overflow-hidden">
    <ProvideVideoModal
      class="video-container mb-2"
      :style="{
        height: scaledVideoHeight ? `${scaledVideoHeight}px` : 'auto',
        maxHeight: `60vh`
      }"
    >
      <template #default="{open}">
        <IntersectSwitch :threshold="[0, 0.3, 0.5, 0.6, 0.8, 1]">
          <template #default="{ visible }">
            <div class="w-full h-full">
              <VideoPlayer
                v-if="visible"
                :autoplay="!$match('desktop')"
                :video="primaryVideo"
                size-control
                @viewed="handleViewed"
                @open-full-size="open(primaryVideo)"
              />

              <div v-else class="w-full bg-mono-800 h-full"></div>
            </div>
          </template>
        </IntersectSwitch>
      </template>
    </ProvideVideoModal>

    <slot name="actions" :step="step"></slot>

    <header class="px-4 mb-4 flex">
      <h2 class="text-mono-100 font-normal mr-auto">
        {{ step.name }}
      </h2>
    </header>
    <footer class="px-4 mb-4">
      <section class="-mt-1">
        <Tags :step="step" />
      </section>
    </footer>
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
