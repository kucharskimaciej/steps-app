<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";
import { VideoObject } from "../../../common/types/VideoObject";
import { VueWithStore } from "@/lib/vueWithStore";
import { Inject } from "vue-typedi";
import {
  VideoDimensionsService,
  VideoMetadata
} from "@/lib/videoDimensionsService";

@Component({
  components: {
    VideoPlayer,
    BasicLoader
  }
})
export default class VideoModalContent extends VueWithStore {
  @Inject() private readonly dimensions!: VideoDimensionsService;

  @Prop({ required: true }) private video!: VideoObject;

  loading = false;
  videoWithDimensions: VideoMetadata | null = null;

  @Watch("video", { immediate: true })
  handleUrlChange(video: VideoObject) {
    this.loading = true;
    this.dimensions
      .getVideoDimensions(video)
      .then(videoWithDimensions => {
        this.videoWithDimensions = videoWithDimensions;
      })
      .finally(() => (this.loading = false));
  }

  get isVideoLoaded() {
    return !this.loading;
  }

  get aspectRatio(): number {
    return this.videoWithDimensions
      ? this.videoWithDimensions.width / this.videoWithDimensions.height
      : 0;
  }

  get shouldRotate() {
    return (
      this.$client.aspectRatio < 1 && !this.loading && this.aspectRatio > 1
    );
  }

  get videoPlayerStyles() {
    if (!this.shouldRotate) {
      return null;
    }

    return {
      transform: "rotate(90deg)",
      transformOrigin: "0 0",
      width: `${this.$client.height}px`,
      height: `${this.$client.width}px`,
      position: "relative",
      right: "-100%"
    };
  }
}
</script>

<template>
  <div class="flex h-full">
    <main v-if="isVideoLoaded" class="video-container h-full w-full m-auto">
      <VideoPlayer
        :video="video"
        :autoplay="true"
        thumbnail
        :style="videoPlayerStyles"
      />
    </main>

    <aside v-else class="m-auto w-full flex-shrink-0">
      <BasicLoader />
    </aside>
  </div>
</template>
