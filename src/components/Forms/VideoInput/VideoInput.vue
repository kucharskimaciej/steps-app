<script lang="ts">
import { defineComponent, inject, PropType, reactive } from "vue";
import FileInput from "@/components/Forms/FileInput.vue";
import Video from "@/components/Forms/VideoInput/Video.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";
import type { VideoObject } from "../../../../common/types/VideoObject";
import { Container } from "typedi";
import { FileIdentityService } from "@/lib/fileIdentity.service";
import { VideoUploaderToken } from "@/lib/tokens";
import type { Validation } from "@vuelidate/core";
import { without } from "lodash";

const VideoInput = defineComponent({
  components: {
    FileInput,
    Video,
    PureButton,
    PureIcon,
  },
  props: {
    modelValue: {
      type: Array as PropType<VideoObject[]>,
      default: () => [],
    },
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    const fileIdentity = Container.get(FileIdentityService);
    const videoUpload = Container.get(VideoUploaderToken);

    const originalFilenames = reactive<Record<string, string>>({});
    const validation = inject<Validation | null>("validation", null);

    console.log("validation", validation);

    function triggerValidation() {
      if (validation) {
        validation.$touch();
      }
    }

    function fileAlreadySelected(hash: string) {
      return props.modelValue.some((video) => video.hash === hash);
    }

    function handleVideoRemoved(video: VideoObject): void {
      emit("update:modelValue", without(props.modelValue, video));
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

      emit("update:modelValue", [...props.modelValue, { hash, url }]);
      triggerValidation();
    }

    return {
      handleVideoRemoved,
      onFileSelected,
      validation,
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
      v-for="(video, index) in modelValue"
      :key="video.hash"
      class="border-t"
      :class="{
        'text-red-lighter': validation.$each.$response.$errors[index].length,
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
