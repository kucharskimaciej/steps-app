<script lang="ts">
import { Vue, Component, Prop, Emit, Ref } from "vue-property-decorator";
import { Step } from "../../../common/types/Step";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import FeedActions from "@/components/Feed/FeedActions.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import Tags from "@/components/Step/components/Tags.vue";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";
import OptionsPopup from "@/components/Feed/OptionsPopup.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import Feed from "@/components/Feed/Feed.vue";
import RecordPracticeWidget from "@/components/RecordPracticeWidget/RecordPracticeWidget.vue";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";

@Component({
  components: {
    Feed,
    VideoPlayer,
    PureTag,
    OptionsPopup,
    PopupMenuItem,
    FeedActions,
    PureIcon,
    PureButton,
    Tags,
    IntersectSwitch,
    VideoModal,
    InlineModal,
    RecordPracticeWidget
  }
})
export default class FeedStep extends Vue {
  @Prop({ required: true }) private step!: Step;
  @Prop() private autoplay!: boolean;
  @Prop({ default: true }) private showVariations!: boolean;
  @Prop({ default: false }) private practiceActions!: boolean;

  @Ref("videoModal") readonly videoModal!: VideoModal;

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

  variationsOpen = false;

  get hasVariations() {
    return this.step.variations?.length > 0;
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
    <section class="px-2 -mx-1 flex mb-2">
      <span class="w-full mr-auto">
        <slot v-if="$slots.leftActionsArea" name="leftActionsArea" :step="step">
          <PureButton
            v-if="hasVariations"
            size="small"
            kind="ghost"
            class="mr-auto"
            @click="variationsOpen = true"
          >
            <span v-if="$match('desktop')" class="mr-1">Variations</span>
            <PureIcon type="collections" class="text-xl" />
          </PureButton>
        </slot>
      </span>

      <span class="flex-shrink-0 text-center">
        &nbsp;
      </span>

      <span class="w-full ml-auto text-right">
        <slot name="rightActionsArea" :step="step"></slot>
      </span>
    </section>
    <header class="px-2 mb-2 flex">
      <h2 class="text-mono-100 font-normal mr-auto">
        {{ step.name }}
      </h2>

      <OptionsPopup :step="step">
        <template #toggle="{ open }">
          <PureButton size="small" kind="ghost" @click="open">
            <PureIcon type="more_vert" class="text-xl" />
          </PureButton>
        </template>

        <template #customOptions>
          <PopupMenuItem v-if="hasVariations" @click="variationsOpen = true">
            Show variations
          </PopupMenuItem>
        </template>
      </OptionsPopup>
    </header>
    <footer class="px-2 mb-2">
      <section class="-mt-1">
        <Tags :step="step" />
      </section>
    </footer>
    <VideoModal ref="videoModal" />

    <InlineModal
      v-if="variationsOpen"
      modal-style="OVERLAY"
      @close-modal="variationsOpen = false"
    >
      <Feed :steps="step.variations" />
    </InlineModal>
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
