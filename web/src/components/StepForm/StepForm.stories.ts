import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import { Component } from "vue";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { Container as DIContainer } from "typedi";

class FakeStepLocator implements DuplicateLocator<RawStep, string> {
  isDuplicate(key: string): boolean {
    return key === "http://example.com";
  }

  getDuplicate(key: string): void | RawStep {
    return this.isDuplicate(key)
      ? {
          id: "fake-id",
          owner_uid: "fake-id",
          identifier: 12,
          name: "Męska grande-saida z zatrzymaniem partnerki",
          url:
            "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
          tags: ["Grande saida", "Zatrzymanie"],
          difficulty: 3,
          dance: ["semba"],
          created_at: Date.now(),
          artists: []
        }
      : undefined;
  }
}

import StepForm from "@/components/StepForm/StepForm.vue";
import { ArtistTag, Tag, TagTypes } from "../../../../common/types/Tag";
import { RawStep } from "../../../../common/types/Step";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";
DIContainer.set(StepsByUrlDuplicateLocatorToken, new FakeStepLocator());

export default {
  title: "Components/StepForm",
  decorators: [
    withKnobs,
    Container("600px"),
    Spacing,
    WithGlobalStyles,
    NeutralBackground
  ]
};

export const EmptyForm: () => Component = () => ({
  components: {
    StepForm
  },
  template: `<StepForm @save-step="handleSave" :existing-tags="tags" :existing-artists="artists" />`,
  methods: {
    handleSave: action("HANDLE_SAVE")
  },
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"],
    artists: ["Nowak & Majchrowska", "Ricardo & Paula", "Tomek & Marzena"]
  })
});

export const WithData: () => Component = () => ({
  components: {
    StepForm
  },
  template: `<StepForm @save-step="handleSave" :step="step" :existing-tags="tags" :existing-artists="artists" />`,
  methods: {
    handleSave: action("HANDLE_SAVE")
  },
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"],
    artists: ["Nowak & Majchrowska", "Ricardo & Paula", "Tomek & Marzena"]
  }),
  props: {
    step: {
      default: {
        id: "fake-id",
        owner_uid: "fake-id",
        identifier: 12,
        name: "Męska grande-saida z zatrzymaniem partnerki",
        url:
          "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
        tags: ["Grande saida", "Zatrzymanie"],
        difficulty: 3,
        dance: ["semba"],
        created_at: Date.now(),
        artists: []
      } as RawStep
    }
  }
});
