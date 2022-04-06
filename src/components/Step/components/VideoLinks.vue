<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Step } from "../../../../common/types/Step";
import { VideoObject } from "../../../../common/types/VideoObject";

const StepVideoLinks = defineComponent({
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
    skipFirst: Boolean,
  },
  emits: ["openVideo"],
  setup(props, { emit }) {
    function openVideo(video: VideoObject) {
      emit("openVideo", video);
    }

    const videoUrls = computed(() => {
      let videosToDisplay: VideoObject[] = props.step.videos;

      if (props.skipFirst) {
        [, ...videosToDisplay] = props.step.videos;
      }

      return videosToDisplay;
    });

    const indexOffset = computed(() => (props.skipFirst ? 2 : 1));

    return {
      openVideo,
      videoUrls,
      indexOffset,
    };
  },
});

export default StepVideoLinks;
</script>

<template>
  <span>
    <a
      v-for="(video, index) in videoUrls"
      :key="video.url"
      target="_blank"
      class="bg-gray-200 text-gray-700 px-3 py-1 rounded-sm text-xs mr-1 mb-1 hover:bg-gray-300"
      @click="openVideo(video)"
    >
      Video {{ index + indexOffset }}
    </a>
  </span>
</template>
