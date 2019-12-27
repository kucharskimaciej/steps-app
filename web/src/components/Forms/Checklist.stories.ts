import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { Container, NeutralBackground, Spacing, WithGlobalStyles } from "../../stories/decorators";
import FormGroup from "@/components/Forms/FormGroup.vue";
import Checklist from "@/components/Forms/Checklist.vue";

export default {
    title: "Components/Forms/Checklist",
    decorators: [
        withKnobs,
        Spacing,
        WithGlobalStyles,
        Container("600px"),
        NeutralBackground
    ]
};

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
            type: Array,
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

export const GivenValues = () => ({
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
            type: Array,
            default: ['a', 'b', 'c']
        },
        hasError: {
            type: Boolean,
            default: boolean("invalid", false)
        }
    },
    data: () => ({
        values: ['c', 'b']
    })
});
