<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { pick } from "lodash";
import MuteControl from "@/components/Video/MuteControl.vue";
import SizeControl from "@/components/Video/SizeControl.vue";
import PlayControl from "@/components/Video/PlayControl.vue";

const mediaEvents = [
  "abort",
  "canplay",
  "canplaythrough",
  "durationchange",
  "emptied",
  "encrypted",
  "ended",
  "error",
  "interruptbegin",
  "interruptend",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "mozaudioavailable",
  "pause",
  "play",
  "playing",
  "progress",
  "ratechange",
  "seeked",
  "seeking",
  "stalled",
  "suspend",
  "timeupdate",
  "volumechange",
  "waiting"
];

@Component({
  components: {
    PlayControl,
    SizeControl,
    MuteControl
  }
})
export default class VideoPlayer extends Vue {
  @Prop({ required: true }) private url!: string;

  muted = true;
  playing = false;

  get videoEventListeners() {
    return pick(this.$listeners, mediaEvents);
  }

  get videoElement() {
    return this.$refs.video as HTMLVideoElement;
  }

  toggleMuted(value = !this.muted) {
    this.muted = value;
    this.videoElement.muted = value;
  }

  toggleSize() {
    this.videoElement.requestFullscreen();
  }

  play() {
    this.playing = !this.playing;
    if (this.playing) {
      this.videoElement.play();
    } else {
      this.videoElement.pause();
    }
  }

  handlePlayingChange(value: boolean) {
    this.playing = value;
  }
  handleVolumeChange() {
    this.toggleMuted(this.videoElement.muted);
  }
}
</script>

<template>
  <main class="relative">
    <video
      ref="video"
      :muted="muted"
      :src="url"
      loop
      playsinline
      v-on="videoEventListeners"
      @volumechange="handleVolumeChange"
      @play="handlePlayingChange(true)"
      @pause="handlePlayingChange(false)"
    />

    <aside
      class="absolute inset-0 flex items-center justify-center"
      @click="play"
    >
      <PlayControl v-if="!playing" />
    </aside>

    <aside class="absolute top-0 right-0 m-2 flex flex-col">
      <MuteControl class="mb-1" :muted="muted" @toggle-muted="toggleMuted" />
      <SizeControl :enabled="false" @toggle="toggleSize" />
    </aside>
  </main>
</template>
