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
export default class FeedStep extends Vue {
  @Prop({ required: true }) private step!: Step;

  get anchor() {
    return `step-${this.step.id}`;
  }

  get primaryVideo() {
    return this.step.videos[0];
  }
}
</script>

<template>
  <article :id="anchor" class="bg-white rounded shadow overflow-hidden">
    <main class="mb-2">
      <VideoPlayer :url="primaryVideo.url" />
    </main>
    <header class="px-2 mb-1">
      <h2 class="text-wood-bark font-normal mr-auto">
        {{ step.name }}
      </h2>
    </header>
    <footer class="px-2 mb-2">
      <PureTag
        v-for="tag in step.tags"
        :key="tag.text"
        :tag="tag"
        class="mr-1 mt-1 inline-block"
      />
    </footer>
  </article>
</template>
