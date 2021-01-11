<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";

@Component({
  components: {
    VideoPlayer
  }
})
export default class VideoModal extends Vue {
  @Prop({ required: true }) private videoUrl!: string;
}
</script>

<template>
  <div class="flex h-full">
    <VideoPlayer class="video w-full m-auto" :url="videoUrl" :autoplay="true" />
  </div>
</template>
