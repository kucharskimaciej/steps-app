<script lang="ts">
import { Vue, Component, Prop, InjectReactive } from "vue-property-decorator";
import { Inject } from "vue-typedi";
import { Validation } from "vuelidate";
import FileInput from "@/components/Forms/FileInput.vue";
import { FileIdentityService } from "@/lib/fileIdentity.service";
import { VideoUploaderToken } from "@/lib/tokens";
import { Uploader } from "@/lib/uploader.interface";
import { VideoObject } from "../../../../common/types/VideoObject";
import Video from "@/components/Forms/VideoInput/Video.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

@Component({
  components: {
    FileInput,
    Video,
    PureButton,
    PureIcon
  }
})
export default class VideoInput extends Vue {
  @Prop({ default: () => [] }) private value!: VideoObject[];

  @Inject() private readonly fileIdentity!: FileIdentityService;
  @Inject(VideoUploaderToken) private readonly videoUpload!: Uploader;

  @InjectReactive({ from: "validation", default: false })
  validation!: Validation;

  originalFilenames: Record<string, string> = {};

  async onFileSelected(file: File) {
    // user clicked cancel
    if (!file.name) {
      this.triggerValidation();
      return;
    }

    const hash = await this.fileIdentity.getIdentifier(file);
    this.originalFilenames[hash] = file.name;
    if (this.fileAlreadySelected(hash)) {
      return;
    }
    const url = await this.videoUpload.upload(file, hash);

    this.value.push({
      hash,
      url
    });

    this.triggerValidation();
  }

  private fileAlreadySelected(hash: string) {
    return this.value.some(video => video.hash === hash);
  }

  private triggerValidation() {
    if (this.validation) {
      this.validation.$touch();
    }
  }

  handleVideoRemoved(video: VideoObject): void {
    const index = this.value.indexOf(video);
    this.value.splice(index, 1);
    this.triggerValidation();
  }
}
</script>

<template>
  <main class="text-gray-700 px-3">
    <header class="mb-4">
      <FileInput accept="video/*" @file-selected="onFileSelected">
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
