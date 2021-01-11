<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Step } from "../../../../../common/types/Step";
import { VideoObject } from "../../../../../common/types/VideoObject";
import PureTag from "@/components/Tags/PureTag.vue";

@Component({
  components: {
    PureTag
  }
})
export default class StepVideoLinks extends Vue {
  @Prop() private step!: Step;
  @Prop() private skipFirst!: boolean;

  get videoUrls() {
    let videosToDisplay: VideoObject[] = this.step.videos;

    if (this.skipFirst) {
      [, ...videosToDisplay] = this.step.videos;
    }

    return videosToDisplay.map(v => v.url);
  }

  get indexOffset() {
    return this.skipFirst ? 2 : 1;
  }
}
</script>

<template>
  <span>
    <a
      v-for="(url, index) in videoUrls"
      :key="url"
      target="_blank"
      class="bg-gray-200 text-gray-700 px-3 py-1 rounded-sm text-xs mr-1 mb-1 hover:bg-gray-300"
      @click="$openModal($modals.SINGLE_VIDEO, url)"
    >
      Video {{ index + indexOffset }}
    </a>
  </span>
</template>
