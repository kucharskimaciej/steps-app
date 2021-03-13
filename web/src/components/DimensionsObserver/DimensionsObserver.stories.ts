import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import DimensionsObserver from "@/components/DimensionsObserver/DimensionsObserver";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/DimensionsObserver",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    DimensionsObserver
  },
  template: `
    <DimensionsObserver @change="handleChange">
    <div class="bg-mono-900" style="height: 600px; resize: vertical; overflow: auto">

    Hello
        </div>
    </DimensionsObserver>
  `,
  methods: {
    handleChange: action("dimensions change")
  },
  data: () => ({}),
  props: {}
});

export const ValueInSlot: () => Component = () => ({
  components: {
    DimensionsObserver
  },
  template: `
    <DimensionsObserver @change="handleChange">
      <template #default="{ height }">
        <div class="bg-mono-900" style="height: 600px; resize: vertical; overflow: auto">

        Hello: {{ height }}
        </div>
      </template>
    </DimensionsObserver>
  `,
  methods: {
    handleChange: action("dimensions change")
  },
  data: () => ({}),
  props: {}
});

export const MaxHeight: () => Component = () => ({
  components: {
    HeightObserver: DimensionsObserver
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
    handleChange: action("dimensions change")
  },
  data: () => ({}),
  props: {}
});
