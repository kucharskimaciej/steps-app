<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { pick, throttle } from "lodash";
import PlayControl from "@/features/VideoPlayer/PlayControl.vue";
import SizeControl from "@/features/VideoPlayer/SizeControl.vue";
import MuteControl from "@/features/VideoPlayer/MuteControl.vue";
import ForwardOne from "@/features/VideoPlayer/ForwardOne.vue";
import BackFive from "@/features/VideoPlayer/BackFive.vue";
import BackOne from "@/features/VideoPlayer/BackOne.vue";
import PlayFromStart from "@/features/VideoPlayer/PlayFromStart.vue";
import SlowControl from "@/features/VideoPlayer/SlowControl.vue";
import Progress from "@/features/VideoPlayer/ProgressTrack.vue";
import { VideoObject } from "../../../common/types/VideoObject";

const FULL_SPEED = 1;
const SLOW_SPEED = 0.5;
const VIEW_THRESHOLD = 0.8;

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
  "waiting",
];

const VideoPlayer = defineComponent({
  components: {
    PlayControl,
    SizeControl,
    MuteControl,
    ForwardOne,
    BackFive,
    BackOne,
    PlayFromStart,
    SlowControl,
    Progress,
  },
  props: {
    video: {
      required: true,
      type: Object as PropType<VideoObject>,
    },
    autoplay: Boolean,
    background: {
      type: Boolean,
      default: true,
    },
    sizeControl: Boolean,
  },
  emits: ["viewed", "open-full-size"],
  setup(props, ctx) {
    const muted = ref(true);
    const playing = ref(false);
    const speed = ref(FULL_SPEED);
    const currentTime = ref(0);
    const viewedFlag = ref(false);

    const videoElementRef = ref<HTMLVideoElement>();

    console.log(ctx.attrs);
    const videoEventListeners = computed(() => pick(ctx.attrs, mediaEvents));
    const isSlow = computed(() => speed.value < 1);
    const snapshotUrl = computed(
      () =>
        `https://storage.googleapis.com/${
          import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
        }/${props.video.snapshot_url}`
    );

    function updateViewedStatus() {
      if (!videoElementRef.value) {
        return;
      }

      const progress =
        videoElementRef.value.currentTime / videoElementRef.value.duration;

      if (progress < 0.1) {
        viewedFlag.value = false;
      }

      if (!viewedFlag.value && progress > VIEW_THRESHOLD) {
        viewedFlag.value = true;
        ctx.emit("viewed");
      }
    }

    function toggleMuted(value = !muted.value) {
      if (!videoElementRef.value) {
        return;
      }

      muted.value = value;
      videoElementRef.value.muted = value;
    }

    function toggleSize() {
      videoElementRef.value?.requestFullscreen();
    }

    function play() {
      playing.value = !playing.value;

      if (playing.value) {
        videoElementRef.value?.play();
      } else {
        videoElementRef.value?.pause();
      }
    }

    function seek(delta: number) {
      if (!videoElementRef.value) {
        return;
      }

      const totalLength = videoElementRef.value?.duration;
      const currentTime = videoElementRef.value?.currentTime;

      if (!currentTime || !totalLength) {
        return;
      }

      videoElementRef.value.currentTime = Math.min(
        Math.max(0, currentTime + delta),
        totalLength
      );
    }

    function toggleSlowSpeed() {
      if (!videoElementRef.value) {
        return;
      }

      videoElementRef.value.playbackRate = speed.value =
        speed.value < FULL_SPEED ? FULL_SPEED : SLOW_SPEED;
    }

    function playFromStart() {
      if (!videoElementRef.value) {
        return;
      }

      videoElementRef.value.currentTime = 0;
    }

    function handlePlayingChange(value: boolean) {
      playing.value = value;
    }

    function handleVolumeChange() {
      if (videoElementRef.value) {
        toggleMuted(videoElementRef.value.muted);
      }
    }

    const handleTimeUpdate = throttle(() => {
      if (videoElementRef.value) {
        currentTime.value = videoElementRef.value.currentTime;
        updateViewedStatus();
      }
    });

    return {
      muted,
      playing,
      currentTime,

      videoEventListeners,
      isSlow,
      snapshotUrl,
      videoElementRef,

      toggleMuted,
      toggleSize,
      play,
      seek,
      toggleSlowSpeed,
      playFromStart,
      handlePlayingChange,
      handleVolumeChange,
      handleTimeUpdate,
    };
  },
});

export default VideoPlayer;
</script>

<template>
  <main
    class="relative bg-black overflow-hidden z-0 flex h-full w-full flex-grow"
  >
    <aside
      v-if="background && video.snapshot_url"
      class="video-background"
      :style="{ backgroundImage: `url(${snapshotUrl})` }"
    />

    <video
      ref="videoElementRef"
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
      <MuteControl class="mb-1" :muted="muted" @click="toggleMuted()" />
      <SizeControl v-if="sizeControl" @click="$emit('open-full-size')" />
    </aside>

    <aside class="absolute bottom-0 right-0 m-2 flex">
      <ForwardOne class="mr-1" @click="seek(1)" />
      <BackFive class="mr-1" @click="seek(-5)" />
      <BackOne class="mr-1" @click="seek(-1)" />
      <PlayFromStart class="mr-1" @click="playFromStart()" />
      <SlowControl class="ml-5" :enabled="isSlow" @click="toggleSlowSpeed()" />
    </aside>

    <aside v-if="videoElementRef" class="absolute bottom-0 right-0 left-0">
      <Progress :current="currentTime" :total="videoElementRef.duration" />
    </aside>
  </main>
</template>

<style scoped lang="scss">
.video-background {
  @apply absolute inset-0 -m-10 bg-cover bg-center -z-1 opacity-70;
  filter: blur(2rem);
}
</style>
