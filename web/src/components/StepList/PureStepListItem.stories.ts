import { storiesOf } from "@storybook/vue";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import { Step } from "../../../../types/Step";
import { TagTypes } from "../../../../types/Tag";
import PureStepListItem from "@/components/StepList/PureStepListItem.vue";

const stepPrototype: Step = {
    document_id: "fake-id",
    owner_uid: "fake-id",
    id: 12,
    name: "Męska grande-saida z zatrzymaniem partnerki",
    media: [
        {
            source: "google_photos",
            url:
                "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO"
        }
    ],
    tags: [
        { text: "Grande saida" },
        { type: TagTypes.DANCE, text: "Fusion" },
        { text: "Zatrzymanie" }
    ],
    created_at: Date.now(),
    last_practiced_at: Date.now()
};

const stories = storiesOf("Components/PureStepListItem", module)
    .addDecorator(WithGlobalStyles)
    .addDecorator(Container("1000px"))
    .addDecorator(Spacing)
    .addDecorator(NeutralBackground);

stories.add("Basic display", () => {
    const step = { ...stepPrototype };

    return {
        components: { PureStepListItem },
        template: '<PureStepListItem :step="step"/>',
        data: () => ({
            step
        })
    };
});

stories.add("Selected", () => {
    const step = { ...stepPrototype };

    return {
        components: { PureStepListItem },
        template: '<PureStepListItem :step="step" :is-selected="true"/>',
        data: () => ({
            step
        })
    };
});

stories.add("Extra long title", () => {
    const step: Step = {
        ...stepPrototype,
        name:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus odio vitae cursus efficitur. Suspendisse pretium dui sed felis tincidunt consequat. Proin non nisi non sem commodo malesuada."
    };

    return {
        components: { PureStepListItem },
        template: '<PureStepListItem :step="step"/>',
        data: () => ({
            step
        })
    };
});

stories.add("Multiple Tags", () => {
    const step: Step = {
        ...stepPrototype,
        name:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dapibus odio vitae cursus efficitur. Suspendisse pretium dui sed felis tincidunt consequat. Proin non nisi non sem commodo malesuada.",
        tags: [
            { text: "saida" },
            { type: TagTypes.DANCE, text: "Kizomba fusion" },
            { type: TagTypes.DANCE, text: "Semba" },
            { text: "Obrót" },
            { text: "Zatrzymanie" },
            { type: TagTypes.DIFFICULTY, text: "Łatwe" }
        ]
    };

    return {
        components: { PureStepListItem },
        template: '<PureStepListItem :step="step"/>',
        data: () => ({
            step
        })
    };
});
