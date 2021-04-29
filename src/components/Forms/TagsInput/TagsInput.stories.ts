import { withKnobs } from "@storybook/addon-knobs";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import { Component } from "vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import FormGroup from "@/components/Forms/FormGroup.vue";

export default {
  title: "Components/TagsInput",
  decorators: [
    withKnobs,
    WithGlobalStyles,
    Container("600px"),
    Spacing,
    NeutralBackground
  ]
};

export const BasicView: () => Component = () => ({
  components: { TagsInput, FormGroup },
  template: `
        <section>
            <FormGroup label="Regular tags input">
                <TagsInput v-model="value" />
            </FormGroup>
            <FormGroup :invalid="true" label="Always invalid">
                <TagsInput v-model="value" />
            </FormGroup>
        </section>
    `,
  data: () => ({
    value: []
  })
});

export const EditExistingTags: () => Component = () => ({
  components: { TagsInput, FormGroup },
  template: `
        <FormGroup>
            <TagsInput v-model="value" />
        </FormGroup>
    `,
  data: () => ({
    value: ["A tag"]
  })
});

export const Autocomplete: () => Component = () => ({
  components: { TagsInput, FormGroup },
  template: `
        <FormGroup>
            <TagsInput :autocomplete="tags" />
        </FormGroup>
    `,
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"]
  })
});

export const AutocompleteOnly: () => Component = () => ({
  components: { TagsInput, FormGroup },
  template: `
        <FormGroup>
            <TagsInput :autocomplete="tags" :allow-new="false" />
        </FormGroup>
    `,
  data: () => ({
    tags: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"]
  })
});

export const RemoveOnly: () => Component = () => ({
  components: { TagsInput, FormGroup },
  template: `
      <FormGroup>
          <TagsInput v-model="value" :allow-new="false" />
      </FormGroup>
  `,
  data: () => ({
    value: ["saida", "Kizomba fusion", "Semba", "Obrót", "Zatrzymanie", "Łatwe"]
  })
});
