import { withKnobs } from "@storybook/addon-knobs";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
} from "@/stories/decorators";
import FileInput from "@/components/Forms/FileInput.vue";
import { action } from "@storybook/addon-actions";
import PureButton from "@/components/PureButton/PureButton.vue";

export default {
  title: "Components/Forms/FileInput",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    NeutralBackground,
    WithGlobalStyles,
  ],
};

export const Default = () => ({
  components: { FileInput },
  template: `<section>
      <FileInput @file-selected="handleChange" />
  </section>`,
  methods: {
    handleChange: action("CHANGE"),
  },
});

export const CustomCTA = () => ({
  components: { FileInput, PureButton },
  template: `<section>
      <FileInput @file-selected="handleChange">
          The text changed
      </FileInput>
  </section>`,
  methods: {
    handleChange: action("CHANGE"),
  },
});
