<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import VideoPlayer from "@/features/VideoPlayer/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import Tags from "@/components/Step/components/Tags.vue";
import { Step } from "../../../common/types/Step";

const ReadonlyStep = defineComponent({
  components: {
    VideoPlayer,
    PureTag,
    Tags,
  },
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
  },
  setup({ step }) {
    const primaryVideo = computed(() => step.videos[0]);

    return {
      primaryVideo,
    };
  },
});

export default ReadonlyStep;
</script>

<template>
  <article class="desktop:p-2 flex flex-col w-full h-full">
    <header class="px-2 desktop:px-0">
      <h1
        class="text-lg desktop:text-2xl font-heading font-bold leading-tight mt-3 desktop:mt-0"
      >
        {{ step.name }}
      </h1>
    </header>

    <main
      class="video-container order-first desktop:order-none desktop:mt-3 max-w-full w-screen max-h-screen bg-black flex desktop:h-auto desktop:w-auto"
    >
      <VideoPlayer
        class="video shadow-lg desktop:rounded w-full m-auto"
        :video="primaryVideo"
        :autoplay="!$match('desktop')"
      />
    </main>

    <footer class="mt-2 px-2 desktop:px-0 pb-2">
      <Tags :step="step" />
    </footer>
  </article>
</template>

<style scoped>
.video-container {
  min-height: -webkit-fill-available;
  min-height: -moz-available;
  min-height: fill-available;
  min-height: 100vh;
}

@media screen and (min-width: theme("screens.desktop")) {
  .video-container {
    height: 800px;
  }
}
</style>
