<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchLoadVideo } from "@/store";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";
import { CurrentVideoState } from "@/store/types";

@Component({
  components: {
    VideoPlayer,
    BasicLoader
  }
})
export default class VideoModal extends VueWithStore {
  @Prop({ required: true }) private videoUrl!: string;

  @Watch("videoUrl", { immediate: true })
  handleUrlChange(url: string) {
    dispatchLoadVideo(this.$store, url);
  }

  get state(): CurrentVideoState {
    return this.$store.state.uiCurrentVideo;
  }

  get isVideoLoaded() {
    return this.state.status === "dirty";
  }

  get shouldRotate() {
    return (
      this.$client.aspectRatio < 1 &&
      this.state.status === "dirty" &&
      this.state.meta.aspectRatio > 1
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
        :url="videoUrl"
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
