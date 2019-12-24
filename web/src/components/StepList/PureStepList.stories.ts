import { storiesOf } from "@storybook/vue";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "@/stories/decorators";
import { Step } from "../../../../common/types/Step";
import { TagTypes } from "../../../../common/types/Tag";
import PureStepList from "@/components/StepList/PureStepList.vue";

const stories = storiesOf("Components/PureStepList", module)
    .addDecorator(Container("900px", "600px"))
    .addDecorator(WithGlobalStyles)
    .addDecorator(Spacing)
    .addDecorator(NeutralBackground);

const steps: Step[] = [
    {
        id: "fake-id",
        owner_uid: "fake-id",
        identifier: 12,
        name: "Męska grande-saida z zatrzymaniem partnerki",
        url:
            "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
        tags: [
            { text: "Grande saida" },
            { type: TagTypes.DANCE, text: "Fusion" },
            { text: "Zatrzymanie" }
        ],
        created_at: Date.now()
    },
    {
        id: "fake-13",
        owner_uid: "fake-13",
        identifier: 13,
        name: "Tepy na 4 kroku saidy damskej + przesunięcie nogi",
        url:
            "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
        tags: [
            { text: "Tep" },
            { type: TagTypes.DANCE, text: "Kizomba" },
            { text: "Przesunięcie nogi" }
        ],
        created_at: Date.now()
    },
    {
        id: "fake-14",
        owner_uid: "fake-id",
        identifier: 14,
        name: "Płynny obrót z przejściem przez shadow position",
        url:
            "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
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
