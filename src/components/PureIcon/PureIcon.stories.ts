import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles,
} from "@/stories/decorators";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const stories = storiesOf("Components/PureIcon", module)
  .addDecorator(withKnobs as any)
  .addDecorator(WithGlobalStyles)
  .addDecorator(Container("500px"))
  .addDecorator(Spacing)
  .addDecorator(NeutralBackground);

stories.add("Basic", () => ({
  components: { PureIcon },
  template: `<PureIcon :type="type" />`,
  props: {
    type: {
      default: text("Type", "search"),
    },
  },
}));
