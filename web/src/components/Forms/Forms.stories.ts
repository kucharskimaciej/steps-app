// import { storiesOf } from "@storybook/vue";
// import {
//     Container,
//     NeutralBackground,
//     Spacing,
//     WithGlobalStyles
// } from "@/stories/decorators";
// import Input from "@/components/Forms/Input.vue";
// import FormGroup from "@/components/Forms/FormGroup.vue";
// import { boolean, withKnobs } from "@storybook/addon-knobs";
//
// const stories = storiesOf("Components/Forms", module)
//     .addDecorator(withKnobs)
//     .addDecorator(WithGlobalStyles)
//     .addDecorator(Container("600px"))
//     .addDecorator(Spacing)
//     .addDecorator(NeutralBackground);
//
// stories.add("Input", () => {
//     return {
//         components: { Input },
//         template: `<Input placeholder="Custom placeholder"/>`
//     };
// });
//
// stories.add("FormGroup|Input", () => {
//     return {
//         components: { Input, FormGroup },
//         template: `
//             <section>
//                 <FormGroup label="Normal input"><Input placeholder="Custom placeholder"/></FormGroup>
//                 <FormGroup label="Has errors" :has-error="hasError"><Input placeholder="Custom placeholder"/></FormGroup>
//             </section>
//         `,
//         data: () => ({
//             hasError: boolean('hasError', false)
//         })
//     };
// });

import { addDecorator } from "@storybook/vue";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Input from "@/components/Forms/Input.vue";
import FormGroup from "@/components/Forms/FormGroup.vue";

export default {
    title: "Components/Forms"
};

addDecorator(withKnobs);
addDecorator(WithGlobalStyles);
addDecorator(Container("600px"));
addDecorator(Spacing);
addDecorator(NeutralBackground);

export const BasicInput = () => ({
    components: { Input },
    template: `<div>
        <Input :placeholder="placeholder" v-model="value"/>
        <pre>{{ value }}</pre>
    </div>`,
    props: {
        placeholder: {
            type: String,
            default: text('Some', 'Custom placeholder')
        }
    },
    data: () => ({
        value: 'weeeel'
    })
});

export const FormGroup_Input = () => ({
    components: { Input, FormGroup },
    template: `<FormGroup :label="label" :invalid="hasError"><Input /></FormGroup>`,
    props: {
        label: {
            type: String,
            default: text('label', 'Just an input')
        },
        hasError: {
            type: Boolean,
            default: boolean('invalid', false)
        }
    }
})
