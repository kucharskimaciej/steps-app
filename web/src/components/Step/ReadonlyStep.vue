<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../common/types/Step";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";

@Component({
  components: {
    VideoPlayer,
    PureTag
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
  <article class="desktop:p-2 flex flex-col">
    <header class=" px-2 desktop:px-0">
      <h1
        class="text-lg desktop:text-2xl font-heading font-bold leading-tight mt-3 desktop:mt-0"
      >
        {{ step.name }}
      </h1>
    </header>

    <main
      class="order-first desktop:order-none desktop:mt-3 max-w-full w-screen max-h-screen h-screen bg-black flex desktop:h-auto"
    >
      <VideoPlayer
        class="shadow-lg desktop:rounded w-full m-auto"
        :url="primaryVideo.url"
        :autoplay="!$match('desktop')"
      />
    </main>

    <footer class="mt-2 px-2 desktop:px-0 pb-2">
      <PureTag
        v-for="tag in step.tags"
        :key="tag.text"
        :tag="tag"
        class="mr-1 mt-1 inline-block"
      />
    </footer>
  </article>
</template>
