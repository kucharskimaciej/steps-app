import { withKnobs } from "@storybook/addon-knobs";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import StringArray from "@/components/Forms/StringArray.vue";
import FormGroup from "@/components/Forms/FormGroup.vue";

export default {
  title: "Components/Forms/StringArray",
  decorators: [
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
    withKnobs
  ]
};

export const Default = () => ({
  components: { StringArray, FormGroup },
  template: `
    <section>
      <FormGroup label="Array of values">
          <StringArray v-model="values" />
      </FormGroup>
      <pre>
        values: {{ values }}
      </pre>
    </section>
  `,
  props: {},
  data: () => ({
    values: ["a", "b"]
  })
});
