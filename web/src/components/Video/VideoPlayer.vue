<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
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
  @Prop({ required: true }) private url!: string;
  @Prop({ default: false }) private autoplay!: boolean;
  @Prop({ default: false }) private thumbnail!: boolean;

  static readonly FULL_SPEED = 1;
  static readonly SLOW_SPEED = 0.5;

  muted = true;
  playing = false;
  speed = VideoPlayer.FULL_SPEED;
  currentTime = 0;

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
    }
  }

  get isSlow() {
    return this.speed < 1;
  }
}
</script>

<template>
  <main class="relative bg-black w-full h-full overflow-hidden z-0">
    <aside v-if="thumbnail" class="absolute inset-0 overflow-hidden -z-1">
      <div class="absolute inset-0 -m-10 opacity-50">
        <video
          class="blurred h-full w-full m-h-full m-w-full absolute inset-x-0 object-cover object-center"
          :src="url"
          muted
        />
      </div>
    </aside>
    <video
      ref="video"
      :muted="muted"
      :src="url"
      loop
      playsinline
      :autoplay="autoplay"
      class="w-full max-h-full absolute inset-x-0 -z-1"
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
      <SizeControl @click="$openModal($modals.SINGLE_VIDEO, url)" />
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

<style scoped>
video {
  top: 50%;
  transform: translateY(-50%);
}

.blurred {
  filter: blur(15px);
}
</style>
