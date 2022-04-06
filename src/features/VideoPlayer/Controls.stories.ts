import Vue, { Component } from "vue";
import { Spacing, WithGlobalStyles, Container } from "@/stories/decorators";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import MuteControl from "@/features/VideoPlayer/MuteControl.vue";
import SizeControl from "@/features/VideoPlayer/SizeControl.vue";
import PlayControl from "@/features/VideoPlayer/PlayControl.vue";
import BackOne from "@/features/VideoPlayer/BackOne.vue";
import ForwardOne from "@/features/VideoPlayer/ForwardOne.vue";
import BackFive from "@/features/VideoPlayer/BackFive.vue";
import ForwardFive from "@/features/VideoPlayer/ForwardFive.vue";
import PlayFromStart from "@/features/VideoPlayer/PlayFromStart.vue";
import SlowControl from "@/features/VideoPlayer/SlowControl.vue";

export default {
  title: "Components/VideoPlayer/Controls",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    // DarkBackground,
    WithGlobalStyles,
  ],
};

export const Mute: () => Component = () =>
  Vue.extend({
    components: {
      MuteControl,
    },
    props: {},
    data: () => ({
      muted: false,
    }),
    methods: {
      toggleMuted() {
        this.muted = !this.muted;
        action("TOGGLE_MUTED")();
      },
    },
    template: `<MuteControl :muted="muted" @toggle-muted="toggleMuted" />`,
  });

export const Size: () => Component = () =>
  Vue.extend({
    components: {
      SizeControl,
    },
    props: {},
    data: () => ({
      fullscreen: false,
    }),
    methods: {
      toggle() {
        this.fullscreen = !this.fullscreen;
        action("TOGGLE")();
      },
    },
    template: `<SizeControl :enabled="fullscreen" @toggle="toggle" />`,
  });

export const Play: () => Component = () =>
  Vue.extend({
    components: {
      PlayControl,
    },
    methods: {
      clicked: action("CLICKED"),
    },
    template: `<PlayControl @click="clicked" />`,
  });

export const Slow: () => Component = () =>
  Vue.extend({
    components: {
      SlowControl,
    },
    props: {},
    data: () => ({
      slow: false,
    }),
    methods: {
      toggle() {
        this.slow = !this.slow;
        action("TOGGLE")();
      },
    },
    template: `<main>
        <span class="p-5 bg-black inline-block"><SlowControl :enabled="slow" @toggle="toggle" /></span>
        <span class="p-5 inline-block"><SlowControl :enabled="slow" @toggle="toggle" /></span>
    </main>`,
  });

export const SeekControls: () => Component = () =>
  Vue.extend({
    components: {
      BackOne,
      BackFive,
      ForwardOne,
      ForwardFive,
      PlayFromStart,
    },
    methods: {
      clicked: action("CLICKED"),
    },
    template: `<div>
        <div class="p-5 bg-black">
            <PlayFromStart @click="clicked('start')" />
            <BackOne @click="clicked('-1s')" />
            <BackFive @click="clicked('-5s')" />
            <ForwardOne @click="clicked('+1s')" />
            <ForwardFive @click="clicked('+5s')" />
        </div>

        <div class="p-5">
            <PlayFromStart @click="clicked('start')" />
            <BackOne @click="clicked('-1s')" />
            <BackFive @click="clicked('-5s')" />
            <ForwardOne @click="clicked('+1s')" />
            <ForwardFive @click="clicked('+5s')" />
        </div>
    </div>`,
  });
