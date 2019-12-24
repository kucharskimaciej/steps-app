import { addDecorator } from "@storybook/vue";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Input from "@/components/Forms/Input.vue";
import Select from "@/components/Forms/Select.vue";
import FormGroup from "@/components/Forms/FormGroup.vue";
import PureCheckbox from "@/components/Forms/PureCheckbox.vue";
import Checklist from "@/components/Forms/Checklist.vue";

export default {
    title: "Components/Forms",
    decorators: [
        withKnobs,
        WithGlobalStyles,
        Container("600px"),
        Spacing,
        NeutralBackground
    ]
};

export const BasicInput = () => ({
    components: { Input, FormGroup },
    template: `<FormGroup :label="label" :invalid="hasError"><Input v-model="value" /></FormGroup>`,
    props: {
        label: {
            type: String,
            default: text("label", "Just an input")
        },
        hasError: {
            type: Boolean,
            default: boolean("invalid", false)
        }
    },
    data: () => ({
        value: ""
    })
});

export const BasicSelect = () => ({
    components: { Select, FormGroup },
    template: `
        <FormGroup :label="label" :invalid="hasError">
            <Select v-model="value">
                <option v-for="option in options" :value="option.id">{{ option.text }}</option>
            </Select>
        </FormGroup>`,
    props: {
        label: {
            type: String,
            default: text("label", "Just a select")
        },
        hasError: {
            type: Boolean,
            default: boolean("invalid", false)
        },
        options: {
            default: [
                { id: 1, text: "Option 1" },
                { id: 2, text: "Option 2" },
                { id: 3, text: "Option 3" },
                { id: 4, text: "Option 4" }
            ]
        }
    },
    data: () => ({
        value: null
    })
});

export const Checkbox = () => ({
    components: { PureCheckbox, FormGroup },
    template: `
        <section>
            <FormGroup :invalid="hasError">
                <PureCheckbox v-model="value" type="checkbox">
                    {{ label }}
                </PureCheckbox>
            </FormGroup>

            value: {{ value }}
        </section>`,
    props: {
        hasError: {
            type: Boolean,
            default: boolean("invalid", false)
        }
    },
    data: () => ({
        value: true
    })
});

export const ListOfCheckboxes = () => ({
    components: { Checklist, FormGroup },
    template: `
        <section>
            <FormGroup :invalid="hasError">
                <Checklist v-model="values" :options="options" #default="{ option }">
                    {{ option }}
                </Checklist>
            </FormGroup>

            value: {{ values }}
        </section>`,
    props: {
        label: {
            type: String,
            default: text("label", "Just a select")
        },
        options: {
            type: String,
            default: ['a', 'b', 'c']
        },
        hasError: {
            type: Boolean,
            default: boolean("invalid", false)
        }
    },
    data: () => ({
        values: []
    })
});
