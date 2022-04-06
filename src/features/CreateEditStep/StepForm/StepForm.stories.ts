import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
} from "@/stories/decorators";
import { Component } from "vue";
import { AlwaysDuplicate } from "@/stories/mocks/mockStepDuplicateLocator.service";
import { Container as DIContainer } from "typedi";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import StepForm from "@/features/CreateEditStep/StepForm/StepForm.vue";
import PureButton from "@/components/PureButton/PureButton.vue";
import { StepFormApi } from "@/features/CreateEditStep/StepForm/types";
import Vue from "vue";
import { rawStepFactory } from "@/stories/fixtures/steps";

DIContainer.set(StepsDuplicateLocatorToken, new AlwaysDuplicate());

export default {
  title: "Components/CreateEditStep",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground,
  ],
};

export const EmptyForm: () => Component = () => ({
  components: {
    StepForm,
    PureButton,
  },
  template: `<main>
      <StepForm ref="form" :existing-tags="tags" :existing-artists="artists" />
      <PureButton @click.native="handleSave" kind="primary" spacing="wide" size="large">Save</PureButton>
  </main>`,
  methods: {
    handleSave() {
      const form = (this as Vue).$refs.form as unknown as StepFormApi;
      if (form.validate()) {
        action("HANDLE_SAVE")(form.value);
      }
    },
  },
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"],
    artists: ["Nowak & Majchrowska", "Ricardo & Paula", "Tomek & Marzena"],
  }),
});

export const WithData: () => Component = () => ({
  components: {
    StepForm,
    PureButton,
  },
  template: `<main>
      <StepForm ref="form" :step="step" :existing-tags="tags" :existing-artists="artists" />
      <PureButton @click.native="handleSave" kind="primary" spacing="wide" size="large">Save</PureButton>
  </main>`,
  methods: {
    handleSave() {
      const form = (this as Vue).$refs.form as unknown as StepFormApi;
      if (form.validate()) {
        action("HANDLE_SAVE")(form.value);
      }
    },
  },
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"],
    artists: ["Nowak & Majchrowska", "Ricardo & Paula", "Tomek & Marzena"],
  }),
  props: {
    step: {
      default: rawStepFactory(),
    },
  },
});
