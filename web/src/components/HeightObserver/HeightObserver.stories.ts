import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import HeightObserver from "@/components/HeightObserver/HeightObserver";

export default {
  title: "Components/HeightObserver",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    HeightObserver
  },
  template: `
    <HeightObserver @change="handleChange">
    <div class="bg-mono-900" style="height: 600px; resize: vertical; overflow: auto">

    Hello
        </div>
    </HeightObserver>
  `,
  methods: {
    handleChange(value: number) {
      console.log(value);
    }
  },
  data: () => ({}),
  props: {}
});

export const ValueInSlot: () => Component = () => ({
  components: {
    HeightObserver
  },
  template: `
    <HeightObserver @change="handleChange">
      <template #default="{ height }">
        <div class="bg-mono-900" style="height: 600px; resize: vertical; overflow: auto">

        Hello: {{ height }}
        </div>
      </template>
    </HeightObserver>
  `,
  methods: {
    handleChange(value: number) {
      console.log(value);
    }
  },
  data: () => ({}),
  props: {}
});

export const MaxHeight: () => Component = () => ({
  components: {
    HeightObserver
  },
  template: `
    <HeightObserver @change="handleChange" max-height>
      <template #default="{ height }">
        <div class="bg-mono-900" style="height: 600px; resize: vertical; overflow: auto">
          Hello: {{ height }}
        </div>
      </template>
    </HeightObserver>
  `,
  methods: {
    handleChange(value: number) {
      console.log(value);
    }
  },
  data: () => ({}),
  props: {}
});
