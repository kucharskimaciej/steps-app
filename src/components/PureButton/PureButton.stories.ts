import { storiesOf } from "@storybook/vue";
import {
  WithGlobalStyles,
  NeutralBackground,
  Spacing,
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
                <PureButton kind="secondary">Secondary</PureButton>
                <PureButton kind="outline">Outline</PureButton>
                <PureButton kind="ghost">Ghost</PureButton>
            </div>
        `,
  };
});

stories.add("Small", () => {
  return {
    components: { PureButton },
    template: `
<div class="mb-5">
    <PureButton kind="primary" size="small">Primary</PureButton>
    <PureButton kind="secondary" size="small">Success</PureButton>
</div>
        `,
  };
});

stories.add("Large", () => {
  return {
    components: { PureButton },
    template: `
<div class="mb-5">
    <PureButton kind="primary" size="large">Primary</PureButton>
    <PureButton kind="secondary" size="large">Secondary</PureButton>
</div>
        `,
  };
});

stories.add("Icon only", () => {
  return {
    components: { PureButton, PureIcon },
    template: `
<div class="mb-5">
    <PureButton kind="primary" size="large">
        <PureIcon type="check"/>
    </PureButton>
    <PureButton kind="primary"><PureIcon type="check"/></PureButton>
    <PureButton kind="secondary" size="small"><PureIcon  type="check"/></PureButton>
    <PureButton kind="outline" size="large"><PureIcon  type="check"/></PureButton>
    <PureButton kind="ghost" size="large"><PureIcon  type="check"/></PureButton>
</div>
        `,
  };
});

stories.add("Disabled", () => {
  return {
    components: { PureButton },
    template: `
<div class="mb-5">
    <PureButton kind="primary" disabled="true">Primary</PureButton>
    <PureButton kind="secondary" disabled="true">Secondary</PureButton>
    <PureButton kind="outline" disabled="true">Outline</PureButton>
    <PureButton kind="ghost" disabled="true">Ghost</PureButton>
</div>
        `,
  };
});
