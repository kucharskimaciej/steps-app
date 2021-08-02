<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InlineModal from "@/components/Modal/InlineModal.vue";
import AspectAwareVideo from "@/components/VideoModal/AspectAwareVideo.vue";
import { VideoObject } from "../../../common/types/VideoObject";

@Component({
  components: {
    AspectAwareVideo,
    InlineModal
  }
})
export default class VideoModal extends Vue {
  video: VideoObject | null = null;
  modalOpen = false;

  openModal(video: VideoObject) {
    this.video = video;
    this.modalOpen = true;
  }
}
</script>

<template>
  <InlineModal
    v-if="modalOpen"
    :modal-style="$modalStyle.BORDERLESS"
    @close-modal="modalOpen = false"
  >
    <AspectAwareVideo :video="video" />
  </InlineModal>
</template>
