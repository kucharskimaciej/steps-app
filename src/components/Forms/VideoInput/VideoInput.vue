<script lang="ts">
import {
  defineComponent,
  inject,
  PropType,
  reactive
} from "@vue/composition-api";
import FileInput from "@/components/Forms/FileInput.vue";
import Video from "@/components/Forms/VideoInput/Video.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import { VideoObject } from "../../../../common/types/VideoObject";
import { Container } from "vue-typedi";
import { FileIdentityService } from "@/lib/fileIdentity.service";
import { VideoUploaderToken } from "@/lib/tokens";
import { Validation } from "vuelidate";

const VideoInput = defineComponent({
  components: {
    FileInput,
    Video,
    PureButton,
    PureIcon
  },
  props: {
    value: {
      type: Array as PropType<VideoObject[]>,
      default: () => []
    }
  },
  setup({ value }) {
    const fileIdentity = Container.get(FileIdentityService);
    const videoUpload = Container.get(VideoUploaderToken);

    const originalFilenames = reactive<Record<string, string>>({});
    const validation = inject<Validation | null>("validation", null);

    function triggerValidation() {
      if (validation) {
        validation.$touch();
      }
    }

    function fileAlreadySelected(hash: string) {
      return value.some(video => video.hash === hash);
    }

    function handleVideoRemoved(video: VideoObject): void {
      const index = value.indexOf(video);
      value.splice(index, 1);
      triggerValidation();
    }

    async function onFileSelected(file: File) {
      // user clicked cancel
      if (!file.name) {
        triggerValidation();
        return;
      }

      const hash = await fileIdentity.getIdentifier(file);
      originalFilenames[hash] = file.name;
      if (fileAlreadySelected(hash)) {
        return;
      }
      const url = await videoUpload.upload(file, hash);

      value.push({
        hash,
        url
      });

      triggerValidation();
    }

    return {
      handleVideoRemoved,
      onFileSelected,
      validation,
      originalFilenames
    };
  }
});

export default VideoInput;
</script>

<template>
  <main class="text-gray-700 px-3">
    <header class="mb-4">
      <FileInput accept="video/*" @file-selected="onFileSelected($event)">
        <PureButton tag="span">
          <PureIcon type="cloud_upload" class="mr-1" />
          Upload video
        </PureButton>
      </FileInput>
    </header>

    <section
      v-for="(video, index) in value"
      :key="video.hash"
      class="border-t"
      :class="{
        'text-red-lighter': validation.$each[index].$error
      }"
    >
      <Video
        :title="video.hash"
        :filename="originalFilenames[video.hash]"
        :url="video.url"
        @remove="handleVideoRemoved(video)"
      />
      <slot :name="`helper-${index}`" />
    </section>
  </main>
</template>
