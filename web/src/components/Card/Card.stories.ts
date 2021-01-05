import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import Card from "@/components/Card/Card.vue";

export default {
  title: "Components/Card",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const Default: () => Component = () => ({
  components: {
    Card
  },
  template: `
    <Card>Card content</Card>`,
  methods: {},
  data: () => ({}),
  props: {}
});

export const Active: () => Component = () => ({
  components: {
    Card
  },
  template: `
    <Card allow-active
          #default="{active}"
          :active="parentActive"
          @toggle-active="parentActive = !parentActive">
      Card content: {{ active ? 'active' : 'not active' }}
    </Card>`,
  methods: {},
  data: () => ({
    parentActive: false
  }),
  props: {}
});
