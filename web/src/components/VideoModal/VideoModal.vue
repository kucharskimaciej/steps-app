<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import { VueWithStore } from "@/lib/vueWithStore";
import { dispatchLoadVideo } from "@/store";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";

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

  get isVideoLoaded() {
    return this.$store.state.uiCurrentVideo.status === "dirty";
  }
}
</script>

<template>
  <div class="flex h-full">
    <VideoPlayer
      v-if="isVideoLoaded"
      class="video w-full m-auto"
      :url="videoUrl"
      :autoplay="true"
      thumbnail
    />

    <aside v-else class="m-auto w-full flex-shrink-0">
      <BasicLoader />
    </aside>
  </div>
</template>
