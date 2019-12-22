import { withKnobs } from "@storybook/addon-knobs";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import { Component } from "vue";
import TagsInput from "@/components/Forms/TagsInput/TagsInput.vue";
import { Tag, TagTypes } from "../../../../../types/Tag";
import FormGroup from "@/components/Forms/FormGroup.vue";

export default {
    title: "Components/TagsInput",
    decorators: [
        withKnobs,
        WithGlobalStyles,
        Container("600px"),
        Spacing,
        NeutralBackground
    ]
};

export const BasicView: () => Component = () => ({
    components: { TagsInput, FormGroup },
    template: `
        <section>
            <FormGroup label="Regular tags input">
                <TagsInput v-model="value" />
            </FormGroup>
            <FormGroup :invalid="true" label="Always invalid">
                <TagsInput v-model="value" />
            </FormGroup>
        </section>
    `,
    data: () => ({
        value: []
    })
});

export const EditExistingTags: () => Component = () => ({
    components: { TagsInput, FormGroup },
    template: `
        <FormGroup>
            <TagsInput v-model="value" />
        </FormGroup>
    `,
    data: () => ({
        value: <Tag[]>[{
            text: 'A tag'
        }]
    })
});


export const Autocomplete: () => Component = () => ({
    components: { TagsInput, FormGroup },
    template: `
        <FormGroup>
            <TagsInput :autocomplete="tags" />
        </FormGroup>
    `,
    data: () => ({
        tags: <Tag[]>[
            { text: "saida" },
            { type: TagTypes.DANCE, text: "Kizomba fusion" },
            { type: TagTypes.DANCE, text: "Semba" },
            { text: "Obrót" },
            { text: "Zatrzymanie" },
            { type: TagTypes.DIFFICULTY, text: "Łatwe" }
        ]
    })
});

export const AutocompleteOnly: () => Component = () => ({
    components: { TagsInput, FormGroup },
    template: `
        <FormGroup>
            <TagsInput :autocomplete="tags" :allow-new="false" />
        </FormGroup>
    `,
    data: () => ({
        tags: <Tag[]>[
            { text: "saida" },
            { type: TagTypes.DANCE, text: "Kizomba fusion" },
            { type: TagTypes.DANCE, text: "Semba" },
            { text: "Obrót" },
            { text: "Zatrzymanie" },
            { type: TagTypes.DIFFICULTY, text: "Łatwe" }
        ]
    })
});
