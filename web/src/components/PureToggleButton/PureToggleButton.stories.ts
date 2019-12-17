import { storiesOf } from "@storybook/vue";
import {
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import PureToggleButton from "@/components/PureToggleButton/PureToggleButton.vue";

const stories = storiesOf("Components/PureToggleButton", module)
    .addDecorator(WithGlobalStyles)
    .addDecorator(Spacing)
    .addDecorator(NeutralBackground);

stories.add("Default", () => {
    return {
        components: { PureToggleButton },
        template: `<PureToggleButton/>`
    };
});

stories.add("Toggled", () => {
    return {
        components: { PureToggleButton },
        template: `<PureToggleButton :toggled="true"/>`
    };
});
