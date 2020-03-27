import { storiesOf } from "@storybook/vue";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import { Step } from "../../../../common/types/Step";
import { TagTypes } from "../../../../common/types/Tag";
import PureStepListItem from "@/components/StepList/PureStepListItem.vue";
import { action } from "@storybook/addon-actions";
import StoryRouter from "storybook-vue-router";

const stories = storiesOf("Components/PureStepListItem", module)
  .addDecorator((StoryRouter as any)())
  .addDecorator(Container("800px"))
  .addDecorator(Spacing)
  .addDecorator(WithGlobalStyles)
  .addDecorator(NeutralBackground);

const stepPrototype: Step = {
  id: "fake-id",
  owner_uid: "fake-id",
  identifier: 12,
  name: "Męska grande-saida z zatrzymaniem partnerki",
  url:
    "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
  tags: [
    { text: "Grande saida" },
    { type: TagTypes.DANCE, text: "Fusion" },
    { text: "Zatrzymanie" }
  ],
  created_at: Date.now(),
  last_practiced_at: Date.now(),
  notes: ""
};

stories.add("Basic display", () => {
  const step = { ...stepPrototype };

  return {
    components: { PureStepListItem },
    template:
      '<PureStepListItem :step="step" @edit="handleEdit" @select="handleSelect"/>',
    data: () => ({
      step
    }),
    methods: {
      handleEdit: action("EDIT"),
      handleSelect: action("SELECT")
    }
  };
});

stories.add("Selected", () => {
  const step = { ...stepPrototype };

  return {
    components: { PureStepListItem },
    template: '<PureStepListItem :step="step" :is-selected="true"/>',
    data: () => ({
      step
    })
  };
});

stories.add("Extra long title", () => {
  const step: Step = {
    ...stepPrototype,
    name:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus odio vitae cursus efficitur. Suspendisse pretium dui sed felis tincidunt consequat. Proin non nisi non sem commodo malesuada."
  };

  return {
    components: { PureStepListItem },
    template: '<PureStepListItem :step="step"/>',
    data: () => ({
      step
    })
  };
});

stories.add("Multiple Tags", () => {
  const step: Step = {
    ...stepPrototype,
    name:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus odio vitae cursus efficitur. Suspendisse pretium dui sed felis tincidunt consequat. Proin non nisi non sem commodo malesuada.",
    tags: [
      { text: "saida" },
      { type: TagTypes.DANCE, text: "Kizomba fusion" },
      { type: TagTypes.DANCE, text: "Semba" },
      { text: "Obrót" },
      { text: "Zatrzymanie" },
      { type: TagTypes.DIFFICULTY, text: "Łatwe" }
    ]
  };

  return {
    components: { PureStepListItem },
    template: '<PureStepListItem :step="step"/>',
    data: () => ({
      step
    })
  };
});
