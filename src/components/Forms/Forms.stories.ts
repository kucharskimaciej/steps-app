import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
} from "@/stories/decorators";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import SimpleInput from "@/components/Forms/SimpleInput.vue";
import Select from "@/components/Forms/Select.vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import PureCheckbox from "@/components/Forms/PureCheckbox.vue";
import Textarea from "@/components/Forms/Textarea.vue";

export default {
  title: "Components/Forms",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    NeutralBackground,
    WithGlobalStyles,
  ],
};

export const BasicInput = () => ({
  components: { Input: SimpleInput, FormGroup },
  template: `<FormGroup :label="label" :invalid="hasError"><Input v-model="value" /></FormGroup>`,
  props: {
    label: {
      type: String,
      default: text("label", "Just an input"),
    },
    hasError: {
      type: Boolean,
      default: boolean("invalid", false),
    },
  },
  data: () => ({
    value: "",
  }),
});

export const BasicSelect = () => ({
  components: { Select, FormGroup },
  template: `
        <FormGroup :label="label" :invalid="hasError">
            <Select v-model="value">
                <option v-for="option in options" :value="option.id">{{ option.text }}</option>
            </Select>
        </FormGroup>`,
  props: {
    label: {
      type: String,
      default: text("label", "Just a select"),
    },
    hasError: {
      type: Boolean,
      default: boolean("invalid", false),
    },
    options: {
      default: [
        { id: 1, text: "Option 1" },
        { id: 2, text: "Option 2" },
        { id: 3, text: "Option 3" },
        { id: 4, text: "Option 4" },
      ],
    },
  },
  data: () => ({
    value: null,
  }),
});

export const Checkbox = () => ({
  components: { PureCheckbox, FormGroup },
  template: `
        <section>
            <FormGroup :invalid="hasError">
                <PureCheckbox v-model="value" type="checkbox">
                    {{ label }}
                </PureCheckbox>
            </FormGroup>

            value: {{ value }}
        </section>`,
  props: {
    hasError: {
      type: Boolean,
      default: boolean("invalid", false),
    },
  },
  data: () => ({
    value: true,
  }),
});

export const BasicTextarea = () => ({
  components: { Textarea, FormGroup },
  template: `<FormGroup :label="label" :invalid="hasError"><Textarea v-model="value" /></FormGroup>`,
  props: {
    label: {
      type: String,
      default: text("label", "Textarea"),
    },
    hasError: {
      type: Boolean,
      default: boolean("invalid", false),
    },
  },
  data: () => ({
    value: "",
  }),
});

export const NestedFormGroup = () => ({
  components: { Input: SimpleInput, FormGroup },
  template: `
      <FormGroup label="outer" :invalid="hasError">
        <FormGroup label="inner" :invalid="hasError">
            <Input v-model="value" />
        </FormGroup>
      </FormGroup>
  `,
  props: {
    hasError: {
      type: Boolean,
      default: boolean("invalid", false),
    },
  },
  data: () => ({
    value: "",
  }),
});
