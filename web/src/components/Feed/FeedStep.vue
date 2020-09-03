<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import FeedActions from "@/components/Feed/FeedActions.vue";
import PureButton from "@/components/PureButton/PureButton.vue";

@Component({
  components: {
    VideoPlayer,
    PureTag,
    CopyToClipboard,
    FeedActions,
    PureIcon,
    PureButton
  }
})
export default class FeedStep extends Vue {
  @Prop({ required: true }) private step!: Step;

  get anchor() {
    return `step-${this.step.id}`;
  }

  get primaryVideo() {
    return this.step.videos[0];
  }
}
</script>

<template>
  <article :id="anchor" class="bg-white rounded shadow overflow-hidden">
    <main class="video-container mb-2">
      <VideoPlayer :url="primaryVideo.url" />
    </main>
    <header class="px-2 mb-2 flex">
      <h2 class="text-wood-bark font-normal mr-auto">
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
        <slot name="actions" :step="step"></slot>
      </FeedActions>
      <section class="-mt-1">
        <PureTag
          v-for="tag in step.tags"
          :key="tag.text"
          :tag="tag"
          class="mr-1 mt-1 inline-block"
        />
      </section>
    </footer>
  </article>
</template>

<style scoped>
.video-container {
  height: 500px;
}
</style>
