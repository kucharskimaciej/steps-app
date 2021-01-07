<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import Tags from "@/components/Step/components/Tags.vue";

@Component({
  components: {
    VideoPlayer,
    PureTag,
    Tags
  }
})
export default class ReadonlyStep extends Vue {
  @Prop({ required: true }) private step!: Step;
  get primaryVideo() {
    return this.step.videos[0];
  }
}
</script>

<template>
  <article class="desktop:p-2 flex flex-col w-full h-full">
    <header class=" px-2 desktop:px-0">
      <h1
        class="text-lg desktop:text-2xl font-heading font-bold leading-tight mt-3 desktop:mt-0"
      >
        {{ step.name }}
      </h1>
    </header>

    <main
      class="video-container order-first desktop:order-none desktop:mt-3 max-w-full w-screen max-h-screen h-screen bg-black flex desktop:h-auto desktop:w-auto"
    >
      <VideoPlayer
        class="video shadow-lg desktop:rounded w-full m-auto"
        :url="primaryVideo.url"
        :autoplay="!$match('desktop')"
      />
    </main>

    <footer class="mt-2 px-2 desktop:px-0 pb-2">
      <Tags :step="step" />
    </footer>
  </article>
</template>

<style scoped>
@media screen and (min-width: theme("screens.desktop")) {
  .video-container {
    height: 800px;
  }
}
</style>
