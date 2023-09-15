<script lang="ts">
import { defineComponent, reactive } from "vue";
import FileInput from "@/components/Forms/FileInput.vue";
import Video from "@/components/Forms/VideoInput/Video.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import type { VideoObject } from "../../../../common/types/VideoObject";
import { Container } from "typedi";
import { FileIdentityService } from "@/lib/fileIdentity.service";
import { VideoUploaderToken } from "@/lib/tokens";
import { useField, useFieldArray } from "vee-validate";

const VideoInput = defineComponent({
  components: {
    FileInput,
    Video,
    PureButton,
    PureIcon,
  },
  setup() {
    const videos = useFieldArray<VideoObject>("videos");
    const field = useField("videos");

    const fileIdentity = Container.get(FileIdentityService);
    const videoUpload = Container.get(VideoUploaderToken);

    const originalFilenames = reactive<Record<string, string>>({});

    function triggerValidation() {
      field.setTouched(true);
    }

    function fileAlreadySelected(hash: string) {
      return videos.fields.value.some(
        (videoRef) => videoRef.value.hash === hash
      );
    }

    function handleVideoRemoved(index: number): void {
      videos.remove(index);
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

      videos.push({ hash, url });

      triggerValidation();
    }

    return {
      videos,
      handleVideoRemoved,
      onFileSelected,
      originalFilenames,
    };
  },
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
      v-for="(video, index) in videos.fields.value"
      :key="video.value.hash"
      class="border-t"
    >
      <Video
        :title="video.value.hash"
        :filename="originalFilenames[video.value.hash]"
        :url="video.value.url"
        @remove="handleVideoRemoved(index)"
      />
      <slot :name="`helper-${index}`" />
    </section>
  </main>
</template>
