import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import { Tag as TagType, TagTypes } from "../../../../common/types/Tag";
import RemovableTag from "@/components/Tags/RemovableTag.vue";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Tags/RemovableTag",
  decorators: [
    withKnobs,
    WithGlobalStyles,
    Container("600px"),
    Spacing,
    NeutralBackground
  ]
};

export const CanBeRemoved = () => ({
  components: { RemovableTag },
  template: "<RemovableTag :tag='tag' @remove='handleRemove' />",
  data: () => ({
    tag: { text: "Semba", type: TagTypes.DANCE } as TagType
  }),
  methods: {
    handleRemove: action("REMOVE")
  }
});
