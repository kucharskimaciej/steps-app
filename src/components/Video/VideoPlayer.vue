<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { pick } from "lodash";
import MuteControl from "@/components/Video/MuteControl.vue";
import SizeControl from "@/components/Video/SizeControl.vue";
import PlayControl from "@/components/Video/PlayControl.vue";
import ForwardOne from "@/components/Video/ForwardOne.vue";
import BackOne from "@/components/Video/BackOne.vue";
import ForwardFive from "@/components/Video/ForwardFive.vue";
import BackFive from "@/components/Video/BackFive.vue";
import PlayFromStart from "@/components/Video/PlayFromStart.vue";
import SlowControl from "@/components/Video/SlowControl.vue";
import Progress from "@/components/Video/Progress.vue";
import { ThrottleTime } from "@/lib/decorators/throttleTime";
import { VideoObject } from "../../../common/types/VideoObject";

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
    MuteControl,
    ForwardOne,
    ForwardFive,
    BackFive,
    BackOne,
    PlayFromStart,
    SlowControl,
    Progress
  }
})
export default class VideoPlayer extends Vue {
  @Prop({ required: true }) private video!: VideoObject;
  @Prop({ default: false }) private autoplay!: boolean;
  @Prop({ default: true }) private background!: boolean;
  @Prop({ default: false }) private sizeControl!: boolean;

  static readonly FULL_SPEED = 1;
  static readonly SLOW_SPEED = 0.5;
  static readonly VIEW_THRESHOLD = 0.8;

  muted = true;
  playing = false;
  speed = VideoPlayer.FULL_SPEED;
  currentTime = 0;
  viewedFlag = false;

  @Emit()
  viewed() {}

  get videoEventListeners() {
    return pick(this.$listeners, mediaEvents);
  }

  provideVideoElement(): HTMLVideoElement {
    return this.$refs.video as HTMLVideoElement;
  }

  toggleMuted(value = !this.muted) {
    this.muted = value;
    this.provideVideoElement().muted = value;
  }

  toggleSize() {
    this.provideVideoElement().requestFullscreen();
  }

  play() {
    this.playing = !this.playing;
    if (this.playing) {
      this.provideVideoElement().play();
    } else {
      this.provideVideoElement().pause();
    }
  }

  seek(delta: number) {
    const totalLength = this.provideVideoElement().duration;
    const currentTime = this.provideVideoElement().currentTime;

    if (!currentTime) {
      return;
    }

    this.provideVideoElement().currentTime = Math.min(
      Math.max(0, currentTime + delta),
      totalLength
    );
  }

  toggleSlowSpeed() {
    this.provideVideoElement().playbackRate = this.speed =
      this.speed < VideoPlayer.FULL_SPEED
        ? VideoPlayer.FULL_SPEED
        : VideoPlayer.SLOW_SPEED;
  }

  playFromStart() {
    this.provideVideoElement().currentTime = 0;
  }

  handlePlayingChange(value: boolean) {
    this.playing = value;
  }

  handleVolumeChange() {
    if (this.provideVideoElement()) {
      this.toggleMuted(this.provideVideoElement().muted);
    }
  }

  @ThrottleTime(500)
  handleTimeUpdate() {
    if (this.provideVideoElement()) {
      this.currentTime = this.provideVideoElement().currentTime;
      this.updateViewedStatus();
    }
  }

  get isSlow() {
    return this.speed < 1;
  }

  private updateViewedStatus() {
    const progress =
      this.provideVideoElement().currentTime /
      this.provideVideoElement().duration;

    if (progress < 0.1) {
      this.viewedFlag = false;
    }

    if (!this.viewedFlag && progress > VideoPlayer.VIEW_THRESHOLD) {
      this.viewedFlag = true;
      this.viewed();
    }
  }
}
</script>

<template>
  <main
    class="relative bg-black overflow-hidden z-0 flex h-full w-full flex-grow"
  >
    <aside
      v-if="background && video.snapshot_url"
      class="video-background"
      :style="{ backgroundImage: `url(${video.snapshot_url})` }"
    />

    <video
      ref="video"
      :muted="muted"
      :src="video.url"
      loop
      playsinline
      :autoplay="autoplay"
      class="relative -z-1 mx-auto flex-grow"
      preload="metadata"
      v-on="videoEventListeners"
      @timeupdate="handleTimeUpdate"
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
      <SizeControl
        v-if="sizeControl"
        @click="$openModal($modals.SINGLE_VIDEO, video)"
      />
    </aside>

    <aside class="absolute bottom-0 right-0 m-2 flex">
      <ForwardOne class="mr-1" @click="seek(1)" />
      <BackFive class="mr-1" @click="seek(-5)" />
      <BackOne class="mr-1" @click="seek(-1)" />
      <PlayFromStart class="mr-1" @click="playFromStart()" />
      <SlowControl class="ml-5" :enabled="isSlow" @toggle="toggleSlowSpeed()" />
    </aside>

    <aside
      v-if="provideVideoElement()"
      class="absolute bottom-0 right-0 left-0"
    >
      <Progress
        :current="currentTime"
        :total="provideVideoElement().duration"
      />
    </aside>
  </main>
</template>

<style scoped lang="scss">
.video-background {
  @apply absolute inset-0 -m-10 bg-cover bg-center -z-1 opacity-70;
  filter: blur(2rem);
}
</style>
