import { Component } from "vue";
import {
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
  Container
} from "@/stories/decorators";
import FormGroup from "@/components/Forms/FormGroup.vue";
import ThreeStateTag from "@/components/Forms/ThreeStateTag.vue";

export default {
  title: "Components/Forms/ThreeStateTag",
  decorators: [Container("600px"), Spacing, WithGlobalStyles, NeutralBackground]
};

export const BasicUsage: () => Component = () => ({
  components: {
    FormGroup,
    ThreeStateTag
  },
  template: `
      <section>
        <FormGroup>
          <ThreeStateTag v-model="value" :tag="tag" />
        </FormGroup>

        value: {{ value }}
      </section>
    `,
  methods: {},
  data: () => ({
    tag: {
      text: "Example tag"
    },
    value: 1,
    label: "this is label"
  }),
  props: {}
});
