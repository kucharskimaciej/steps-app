import { storiesOf } from "@storybook/vue";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import { Step } from "../../../../types/Step";
import { TagTypes } from "../../../../types/Tag";
import PureStepList from "@/components/StepList/PureStepList.vue";
import { action } from "@storybook/addon-actions";

const stories = storiesOf("Components/PureStepList", module)
    .addDecorator(Container("900px", "600px"))
    .addDecorator(WithGlobalStyles)
    .addDecorator(Spacing)
    .addDecorator(NeutralBackground);

const steps: Step[] = [
    {
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
        created_at: Date.now()
    },
    {
        document_id: "fake-13",
        owner_uid: "fake-13",
        id: 13,
        name: "Tepy na 4 kroku saidy damskej + przesunięcie nogi",
        media: [
            {
                source: "google_photos",
                url:
                    "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO"
            }
        ],
        tags: [
            { text: "Tep" },
            { type: TagTypes.DANCE, text: "Kizomba" },
            { text: "Przesunięcie nogi" }
        ],
        created_at: Date.now()
    },
    {
        document_id: "fake-14",
        owner_uid: "fake-id",
        id: 14,
        name: "Płynny obrót z przejściem przez shadow position",
        media: [
            {
                source: "google_photos",
                url:
                    "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO"
            }
        ],
        tags: [
            { text: "Shadow position" },
            { text: "Obrót" },
            { type: TagTypes.DANCE, text: "Kizomba" }
        ],
        created_at: Date.now()
    }
];

stories.add("Basic display", () => {
    const list = [...steps];
    return {
        components: { PureStepList },
        template: '<PureStepList :steps="list"/>',
        data: () => ({
            list
        })
    };
});

stories.add("With scroll", () => {
    const list = [...steps, ...steps, ...steps];
    return {
        components: { PureStepList },
        template: `<PureStepList :steps="list"/>`,
        data: () => ({
            list
        })
    };
});

