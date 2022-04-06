<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import VideoPlayer from "@/features/VideoPlayer/VideoPlayer.vue";
import PureTag from "@/components/Tags/PureTag.vue";
import OptionsPopup from "@/features/Feed/OptionsPopup.vue";
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem.vue";
import FeedActions from "@/features/Feed/FeedActions.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import Tags from "@/components/Step/components/Tags.vue";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import ProvideVideoModal from "@/components/Providers/ProvideVideoModal.vue";
import Badge from "@/components/Badge/Badge.vue";
import { Step } from "../../../common/types/Step";

const FeedStep = defineComponent({
  components: {
    VideoPlayer,
    PureTag,
    OptionsPopup,
    PopupMenuItem,
    FeedActions,
    PureIcon,
    PureButton,
    Tags,
    IntersectSwitch,
    ProvideVideoModal,
    Badge,
  },
  props: {
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
    autoplay: Boolean,
    showVariations: {
      type: Boolean,
      default: true,
    },
    practiceActions: Boolean,
    videoHeight: Number,
  },
  emits: ["edit", "viewed", "play"],
  setup({ step }, { emit }) {
    const anchor = computed(() => `step-${step.id}`);
    const primaryVideo = computed(() => step.videos[0]);

    watch(
      () => step.id,
      () => {
        fetch(step.videos[0].url);
        if (step.videos[0].snapshot_url) {
          fetch(step.videos[0].snapshot_url);
        }
      },
      { immediate: true }
    );

    function handleViewed() {
      emit("viewed");
    }
    return {
      anchor,
      primaryVideo,
      handleViewed,
    };
  },
});

export default FeedStep;
</script>

<template>
  <article :id="anchor" class="bg-mono-white rounded-sm overflow-hidden">
    <ProvideVideoModal
      class="flex items-stretch overflow-hidden mb-2"
      :style="{
        height: videoHeight ? `${videoHeight}px` : 'auto',
        maxHeight: `60vh`,
      }"
    >
      <template #default="{ open }">
        <IntersectSwitch :threshold="[0, 0.25, 0.5, 0.75, 1]">
          <template #default="{ visible }">
            <div class="w-full h-full">
              <VideoPlayer
                v-if="visible"
                :autoplay="!$match('desktop')"
                :video="primaryVideo"
                size-control
                @play="$emit('play')"
                @viewed="handleViewed()"
                @open-full-size="open(primaryVideo)"
              />

              <div v-else class="w-full bg-mono-800 h-full"></div>
            </div>
          </template>
        </IntersectSwitch>
      </template>
    </ProvideVideoModal>

    <slot name="actions" :step="step"></slot>

    <header class="px-4 mb-4 flex">
      <h2 class="text-mono-100 font-normal mr-auto">
        {{ step.name }}
      </h2>
    </header>
    <footer class="px-4 mb-4">
      <section class="-mt-1">
        <Tags :step="step" />
      </section>
    </footer>
  </article>
</template>
