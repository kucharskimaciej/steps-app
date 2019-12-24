import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "../../stories/decorators";
import { Component } from "vue";
import StepForm from "@/components/StepForm/StepForm.vue";
import { Tag, TagTypes } from "../../../../common/types/Tag";

export default {
    title: "Components/StepForm",
    decorators: [
        withKnobs,
        WithGlobalStyles,
        Container("600px"),
        Spacing,
        NeutralBackground
    ]
};

export const EmptyForm: () => Component = () => ({
    components: {
        StepForm
    },
    template: `<StepForm @save-step="handleSave" :existing-tags="tags" />`,
    methods: {
        handleSave: action('HANDLE_SAVE')
    },
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
