<script lang="ts">
import { defineComponent, ref } from "vue";
import AspectAwareVideo from "@/components/VideoModal/AspectAwareVideo.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import { VideoObject } from "../../../common/types/VideoObject";

const VideoModal = defineComponent({
  components: {
    AspectAwareVideo,
    InlineModal,
  },
  setup() {
    const video = ref<VideoObject>();

    function openModal(v: VideoObject) {
      video.value = v;
    }

    return {
      video,
      openModal,
    };
  },
});

export default VideoModal;
</script>

<template>
  <InlineModal
    v-if="video"
    :modal-style="$modalStyle.BORDERLESS"
    @close-modal="video = null"
  >
    <AspectAwareVideo :video="video" />
  </InlineModal>
</template>
