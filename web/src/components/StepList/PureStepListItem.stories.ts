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
import { stepFactory } from "@/stories/fixtures/steps";
import { ROUTES } from "@/router/routes";

const stories = storiesOf("Components/PureStepListItem", module)
  .addDecorator(
    (StoryRouter as any)(
      {},
      {
        routes: [
          {
            name: ROUTES.PUBLIC_STEP,
            path: "/s/:stepId"
          }
        ]
      }
    )
  )
  .addDecorator(Container("800px"))
  .addDecorator(Spacing)
  .addDecorator(WithGlobalStyles)
  .addDecorator(NeutralBackground);

const stepPrototype: Step = stepFactory();

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

stories.add("Multiple videos", () => {
  const step = {
    ...stepPrototype,
    videos: [
      { hash: "hash-1", url: "http://example.com/videos/1" },
      { hash: "hash-2", url: "http://example.com/videos/2" },
      { hash: "hash-3", url: "http://example.com/videos/3" },
      { hash: "hash-4", url: "http://example.com/videos/4" }
    ]
  };

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
