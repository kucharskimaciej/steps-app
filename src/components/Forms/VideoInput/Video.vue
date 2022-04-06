<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import VideoModal from "@/components/VideoModal/VideoModal.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const Video = defineComponent({
  components: {
    VideoModal,
    PureButton,
    PureIcon,
  },
  props: {
    title: String,
    filename: String,
    url: String,
  },
  emits: ["remove"],
  setup({ url, title }) {
    const asVideo = computed(() => {
      return { url, hash: title };
    });
    const videoModal = ref<typeof VideoModal>();

    return {
      asVideo,
      videoModal,
    };
  },
});

export default Video;
</script>

<template>
  <div class="py-2">
    <header class="flex text-sm items-center">
      <strong>{{ title }}</strong>
      <aside class="ml-auto text-sm">
        <PureButton
          role="button"
          kind="secondary"
          class="mr-2"
          @click="videoModal.openModal(asVideo)"
        >
          <PureIcon type="open_in_new" /> Open
        </PureButton>

        <PureButton kind="ghost" @click="$emit('remove')"> Delete </PureButton>
      </aside>
    </header>
    <p v-if="filename" class="font-light text-sm">
      Original filename: {{ filename }}
    </p>

    <VideoModal ref="videoModal" />
  </div>
</template>
