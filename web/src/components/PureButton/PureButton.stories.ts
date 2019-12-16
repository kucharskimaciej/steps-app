import { storiesOf } from "@storybook/vue";
import {
    WithGlobalStyles,
    NeutralBackground,
    Spacing
} from "@/stories/decorators";
import PureButton from "@/components/PureButton/PureButton.vue";

const stories = storiesOf("Components/PureButton", module)
    .addDecorator(WithGlobalStyles)
    .addDecorator(Spacing)
    .addDecorator(NeutralBackground);

stories.add("Buttons", () => {
    return {
        components: { PureButton },
        template: `
<div class="mb-5">
    <PureButton kind="primary">Primary</PureButton>
    <PureButton kind="success">Success</PureButton>
    <PureButton kind="warning">Warning</PureButton>
</div>
        `
    };
});
