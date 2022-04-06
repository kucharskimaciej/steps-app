<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import StepTitle from "@/components/Step/components/StepTitle.vue";
import StepVideoLinks from "@/components/Step/components/VideoLinks.vue";
import Tags from "@/components/Step/components/Tags.vue";
import Variations from "@/components/Step/components/Variations.vue";
import InlineModal from "@/components/Modal/InlineModal.vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";
import { Step } from "../../../common/types/Step";

const FullContent = defineComponent({
  components: {
    StepTitle,
    StepVideoLinks,
    Tags,
    Variations,
    InlineModal,
    VideoModal,
  },
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
  },
  setup({ step }) {
    const firstVideo = computed(() => step.videos[0]);
    const videoModal = ref<typeof VideoModal>();

    return {
      firstVideo,
      videoModal,
    };
  },
});

export default FullContent;
</script>

<template>
  <main>
    <header class="mb-2">
      <StepTitle
        :step="step"
        link-to-video
        @click.native="videoModal.openModal(firstVideo)"
      />
      <StepVideoLinks
        :step="step"
        skip-first
        @open-video="videoModal.openModal($event)"
      />
    </header>

    <Tags :step="step" category="meta" class="mb-1" />
    <Tags :step="step" category="content" class="mb-2" />

    <section v-if="step.variations.length > 0" class="text-sm">
      <h2 class="font-semibold">Variations</h2>
      <Variations :step="step" />
    </section>

    <VideoModal ref="videoModal" />
  </main>
</template>
