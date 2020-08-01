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
  <article class="p-2">
    <header>
      <h1 class="text-xl md:text-3xl font-heading font-bold leading-tight ml-5">
        <span class="relative">{{ step.name }}</span>
      </h1>
    </header>

    <main class="mt-5">
      <VideoPlayer class="shadow-lg rounded" :url="primaryVideo.url" />
    </main>

    <footer class="mt-2">
      <PureTag
        v-for="tag in step.tags"
        :key="tag.text"
        :tag="tag"
        class="mr-1 mt-1 inline-block"
      />
    </footer>
  </article>
</template>

<style scoped lang="scss">
h1 span {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 65%, #ebecf0 65%);
}
</style>
