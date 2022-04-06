import { withKnobs } from "@storybook/addon-knobs";
import { Container, Spacing, WithGlobalStyles } from "@/stories/decorators";
import Vue, { Component } from "vue";
import Progress from "@/features/VideoPlayer/ProgressTrack.vue";

export default {
  title: "Components/VideoPlayer/Progress",
  decorators: [withKnobs, Container("600px"), Spacing, WithGlobalStyles],
};

export const Default: () => Component = () =>
  Vue.extend({
    components: {
      Progress,
    },
    template: `<main>
        <Progress :current="0" :total="100" class="mb-2" />
        <Progress :current="10" :total="100" class="mb-2" />
        <Progress :current="25" :total="100" class="mb-2" />
        <Progress :current="50" :total="100" class="mb-2" />
        <Progress :current="100" :total="100" class="mb-2" />
    </main>`,
  });
