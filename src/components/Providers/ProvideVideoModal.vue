<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import InlineModal from "@/components/Modal/InlineModal.vue";
import AspectAwareVideo from "@/components/VideoModal/AspectAwareVideo.vue";
import { VideoObject } from "../../../common/types/VideoObject";

const ProvideVideoModal = defineComponent({
  components: {
    InlineModal,
    AspectAwareVideo
  },
  setup() {
    const video = ref<VideoObject | null>(null);

    function open(v: VideoObject) {
      video.value = v;
    }

    return {
      open,
      video
    };
  }
});

export default ProvideVideoModal;
</script>

<template>
  <div>
    <slot :open="open" />
    <InlineModal
      v-if="video"
      :modal-style="$modalStyle.BORDERLESS"
      @close-modal="video = null"
    >
      <AspectAwareVideo :video="video" />
    </InlineModal>
  </div>
</template>
