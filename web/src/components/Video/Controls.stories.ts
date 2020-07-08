import Vue, { Component } from "vue";
import {
  Spacing,
  WithGlobalStyles,
  Container,
  DarkBackground
} from "@/stories/decorators";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import MuteControl from "@/components/Video/MuteControl.vue";
import SizeControl from "@/components/Video/SizeControl.vue";
import PlayControl from "@/components/Video/PlayControl.vue";

export default {
  title: "Components/Video/Controls",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    // DarkBackground,
    WithGlobalStyles
  ]
};

export const Mute: () => Component = () =>
  Vue.extend({
    components: {
      MuteControl
    },
    props: {},
    data: () => ({
      muted: false
    }),
    methods: {
      toggleMuted() {
        this.muted = !this.muted;
        action("TOGGLE_MUTED")();
      }
    },
    template: `<MuteControl :muted="muted" @toggle-muted="toggleMuted" />`
  });

export const Size: () => Component = () =>
  Vue.extend({
    components: {
      SizeControl
    },
    props: {},
    data: () => ({
      fullscreen: false
    }),
    methods: {
      toggle() {
        this.fullscreen = !this.fullscreen;
        action("TOGGLE")();
      }
    },
    template: `<SizeControl :enabled="fullscreen" @toggle="toggle" />`
  });

export const Play: () => Component = () =>
  Vue.extend({
    components: {
      PlayControl
    },
    methods: {
      clicked: action("CLICKED")
    },
    template: `<PlayControl @click="clicked" />`
  });
