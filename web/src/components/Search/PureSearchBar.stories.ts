import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";
import {
  Container,
  NeutralBackground,
  Spacing,
  WithGlobalStyles
} from "@/stories/decorators";
import PureSearchBar from "@/components/Search/PureSearchBar.vue";

const stories = storiesOf("Components/Search/PureSearchBar", module)
  .addDecorator(WithGlobalStyles)
  .addDecorator(Container("500px"))
  .addDecorator(Spacing)
  .addDecorator(NeutralBackground);

stories.add("Basic", () => {
  return {
    components: { PureSearchBar },
    template: `<PureSearchBar @search-change="handleSearchChange($event)" />`,
    methods: {
      handleSearchChange: action("SEARCH_CHANGE")
    }
  };
});
