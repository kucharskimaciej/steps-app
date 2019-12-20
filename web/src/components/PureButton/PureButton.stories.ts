import { storiesOf } from "@storybook/vue";
import {
    WithGlobalStyles,
    NeutralBackground,
    Spacing
} from "@/stories/decorators";
import PureButton from "@/components/PureButton/PureButton.vue";
import PureIcon from "@/components/PureIcon/PureIcon.vue";

const stories = storiesOf("Components/PureButton", module)
    .addDecorator(WithGlobalStyles)
    .addDecorator(Spacing)
    .addDecorator(NeutralBackground);

stories.add("Regular", () => {
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

stories.add("Outline", () => {
    return {
        components: { PureButton },
        template: `
<div class="mb-5">
    <PureButton kind="primary" feel="outline">Primary</PureButton>
    <PureButton kind="success" feel="outline">Success</PureButton>
    <PureButton kind="warning" feel="outline">Warning</PureButton>
</div>
        `
    };
});

stories.add("Ghost", () => {
    return {
        components: { PureButton },
        template: `
<div class="mb-5">
    <PureButton kind="primary" feel="ghost">Primary</PureButton>
    <PureButton kind="success" feel="ghost">Success</PureButton>
    <PureButton kind="warning" feel="ghost">Warning</PureButton>
</div>
        `
    };
});

stories.add("Small", () => {
    return {
        components: { PureButton },
        template: `
<div class="mb-5">
    <PureButton kind="primary" feel="outline" size="small">Primary</PureButton>
    <PureButton kind="success" size="small">Success</PureButton>
</div>
        `
    };
});

stories.add("Large", () => {
    return {
        components: { PureButton },
        template: `
<div class="mb-5">
    <PureButton kind="primary" feel="outline" size="large">Primary</PureButton>
    <PureButton kind="success" size="large">Success</PureButton>
</div>
        `
    };
});

stories.add("Icon only", () => {
    return {
        components: { PureButton, PureIcon },
        template: `
<div class="mb-5">
    <PureButton kind="primary" feel="outline" size="large">
        <PureIcon type="check"/>
    </PureButton>
    <PureButton kind="success"><PureIcon  type="check"/></PureButton>
    <PureButton kind="danger" size="small"><PureIcon  type="check"/></PureButton>
    <PureButton kind="success" size="large" feel="ghost"><PureIcon  type="check"/></PureButton>
</div>
        `
    };
});

stories.add("Disabled", () => {
    return {
        components: { PureButton },
        template: `
<div class="mb-5">
    <PureButton kind="primary" feel="regular" disabled="true">Primary</PureButton>
    <PureButton kind="success" feel="outline" disabled="true">Success</PureButton>
    <PureButton kind="warning" feel="ghost" disabled="true">Warning</PureButton>
</div>
        `
    };
});
