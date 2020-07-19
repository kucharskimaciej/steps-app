import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import VideoPlayer from "@/components/Video/VideoPlayer.vue";

export default {
  title: "Components/Video/VideoPlayer",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    VideoPlayer
  },
  template: `
        <VideoPlayer url="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4"/>
    `
});
