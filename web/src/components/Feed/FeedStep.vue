<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import FeedActions from "@/components/Feed/FeedActions.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import Tags from "@/components/Step/components/Tags.vue";

@Component({
  components: {
    VideoPlayer,
    PureTag,
    CopyToClipboard,
    FeedActions,
    PureIcon,
    PureButton,
    Tags
  }
})
export default class FeedStep extends Vue {
  @Prop({ required: true }) private step!: Step;
  @Prop() private videoHeight!: number;
  @Prop() private autoplay!: boolean;

  get anchor() {
    return `step-${this.step.id}`;
  }

  get primaryVideo() {
    return this.step.videos[0];
  }

  @Emit("viewed")
  handleViewed() {}
}
</script>

<template>
  <article :id="anchor" class="bg-white rounded shadow overflow-hidden">
    <main
      class="video-container mb-2"
      :style="{
        height: videoHeight ? `${videoHeight}px` : 'auto'
      }"
    >
      <VideoPlayer
        :autoplay="!$match('desktop')"
        :video="primaryVideo"
        size-control
        @viewed="handleViewed"
      />
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
  </article>
</template>

<style scoped>
.video-container {
  height: auto;
  max-height: 80vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}
</style>
