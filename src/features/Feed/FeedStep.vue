<script lang="ts">
import { computed, defineComponent, PropType, watch } from "vue";
import VideoPlayer from "@/features/VideoPlayer/VideoPlayer.vue";
import Tags from "@/components/Step/components/Tags.vue";
import IntersectSwitch from "@/components/Intersect/IntersectSwitch.vue";
import ProvideVideoModal from "@/components/Providers/ProvideVideoModal.vue";
import { Step } from "../../../common/types/Step";

const FeedStep = defineComponent({
  components: {
    VideoPlayer,
    Tags,
    IntersectSwitch,
    ProvideVideoModal,
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
  setup(props, { emit }) {
    const anchor = computed(() => `step-${props.step.id}`);
    const primaryVideo = computed(() => props.step.videos[0]);

    watch(
      () => props.step.id,
      () => {
        fetch(props.step.videos[0].url);
        if (props.step.videos[0].snapshot_url) {
          fetch(props.step.videos[0].snapshot_url);
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
