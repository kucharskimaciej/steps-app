import { storiesOf } from "@storybook/vue";
import {
  WithGlobalStyles,
  NeutralBackground,
  Spacing
} from "@/stories/decorators";
import { Tag as TagType, TagTypes } from "../../../common/types/Tag";
import PureTag from "@/components/Tags/PureTag.vue";

const tagStories = storiesOf("Components/Tags/PureTag", module)
  .addDecorator(WithGlobalStyles)
  .addDecorator(Spacing)
  .addDecorator(NeutralBackground);

tagStories.add("Basic display", () => {
  return {
    components: { PureTag },
    template: '<PureTag :tag="tag"/>',
    data: () => ({
      tag: { text: "Podniesienie nogi" } as TagType
    })
  };
});

tagStories.add("With type", () => {
  return {
    components: { PureTag },
    template: '<PureTag :tag="tag"/>',
    data: () => ({
      tag: { text: "Semba", type: TagTypes.FEELING } as TagType
    })
  };
});
