<script lang="ts">
import InlineModal from "@/components/Modal/InlineModal.vue";
import AspectAwareVideo from "@/components/VideoModal/AspectAwareVideo.vue";
import { Vue, Component } from "vue-property-decorator";
import { VideoObject } from "../../../common/types/VideoObject";

@Component({
  components: {
    InlineModal,
    AspectAwareVideo
  }
})
export default class ProvideVideoModal extends Vue {
  video: VideoObject | null = null;

  open(video: VideoObject) {
    this.video = video;
  }
}
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
