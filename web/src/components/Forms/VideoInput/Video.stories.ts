import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import { withKnobs } from "@storybook/addon-knobs";
import Video from "@/components/Forms/VideoInput/Video.vue";

export default {
  title: "Components/VideoInput/Video",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    NeutralBackground,
    WithGlobalStyles
  ]
};
export const Default = () => ({
  components: {
    Video
  },
  template: `
    <Video :title="'Video 1'" filename="some_file.mp4" url="http://www.youtube.com/" />
  `
});
