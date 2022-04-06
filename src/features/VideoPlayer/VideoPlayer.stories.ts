import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container,
} from "@/stories/decorators";
import VideoPlayer from "@/features/VideoPlayer/VideoPlayer.vue";

export default {
  title: "Components/VideoPlayer/VideoPlayer",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
  ],
};

export const Default: () => Component = () => ({
  components: {
    VideoPlayer,
  },
  template: `
        <VideoPlayer url="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4"/>
    `,
});

export const Autoplay: () => Component = () => ({
  components: {
    VideoPlayer,
  },
  template: `
        <VideoPlayer :autoplay="true" url="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4"/>
    `,
});
