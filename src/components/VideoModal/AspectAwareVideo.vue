<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import VideoPlayer from "@/features/VideoPlayer/VideoPlayer.vue";
import BasicLoader from "@/components/Loaders/BasicLoader.vue";
import { VideoObject } from "../../../common/types/VideoObject";
import {
  VideoDimensionsService,
  VideoMetadata,
} from "@/lib/videoDimensionsService";
import { Container } from "typedi";
import { ClientInfo } from "@/lib/clientInfo.service";

const AspectAwareVideo = defineComponent({
  components: {
    VideoPlayer,
    BasicLoader,
  },
  props: {
    video: {
      type: Object as PropType<VideoObject>,
      required: true,
    },
  },
  setup(props) {
    const dimensions = Container.get(VideoDimensionsService);
    const client = Container.get(ClientInfo);

    const loading = ref(false);
    const metadata = ref<VideoMetadata | null>(null);

    const aspectRatio = computed((): number => {
      return metadata.value ? metadata.value.width / metadata.value.height : 0;
    });

    const shouldRotate = computed(() => {
      console.log("shouldRotate recalculated: ");
      return client.aspectRatio < 1 && !loading.value && aspectRatio.value > 1;
    });

    const videoPlayerStyles = computed(() => {
      if (!shouldRotate.value) {
        return null;
      }

      return {
        transform: "rotate(90deg)",
        transformOrigin: "0 0",
        width: `${client.height}px`,
        height: `${client.width}px`,
        position: "relative",
        right: "-100%",
      };
    });

    watch(
      props.video,
      (v: VideoObject) => {
        loading.value = true;
        dimensions
          .getVideoDimensions(v)
          .then((videoWithDimensions) => {
            metadata.value = videoWithDimensions;
          })
          .finally(() => (loading.value = false));
      },
      { immediate: true }
    );

    return {
      loading,
      metadata,
      shouldRotate,
      videoPlayerStyles,
    };
  },
});

export default AspectAwareVideo;
</script>

<template>
  <div class="flex h-full">
    <main v-if="!loading" class="video-container h-full w-full m-auto">
      <VideoPlayer
        :video="video"
        :autoplay="true"
        thumbnail
        :style="videoPlayerStyles"
      />
    </main>

    <aside v-else class="m-auto w-full flex-shrink-0">
      <BasicLoader />
    </aside>
  </div>
</template>
