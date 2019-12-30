import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import {
    Container,
    NeutralBackground,
    Spacing,
    WithGlobalStyles
} from "../../stories/decorators";
import { Component } from "vue";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { Container as DIContainer } from "typedi";

class FakeStepLocator implements DuplicateLocator<RawStep, string> {
    constructor() {
        console.log("FakeStepLocator");
    }

    isDuplicate(key: string): boolean {
        console.log(key);
        return key === "http://example.com";
    }

    getDuplicate(key: string): void | RawStep {
        return this.isDuplicate(key)
            ? {
                  id: "fake-id",
                  owner_uid: "fake-id",
                  identifier: 12,
                  name: "Męska grande-saida z zatrzymaniem partnerki",
                  url:
                      "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
                  tags: [{ text: "Grande saida" }, { text: "Zatrzymanie" }],
                  difficulty: 3,
                  dance: ["semba"],
                  created_at: Date.now()
              }
            : undefined;
    }
}

DIContainer.set(StepsByUrlDuplicateLocatorToken, new FakeStepLocator());
import StepForm from "@/components/StepForm/StepForm.vue";
import { Tag, TagTypes } from "../../../../common/types/Tag";
import { RawStep } from "../../../../common/types/Step";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";

export default {
    title: "Components/StepForm",
    decorators: [
        withKnobs,
        Container("600px"),
        Spacing,
        WithGlobalStyles,
        NeutralBackground
    ]
};

export const Test: () => Component = () => ({
    template: `<p>TEST</p>`
});

export const EmptyForm: () => Component = () => ({
    components: {
        StepForm
    },
    template: `<StepForm @save-step="handleSave" :existing-tags="tags" />`,
    methods: {
        handleSave: action("HANDLE_SAVE")
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
//
// export const WithData: () => Component = () => ({
//     components: {
//         StepForm
//     },
//     template: `<StepForm @save-step="handleSave" :step="step" :existing-tags="tags" />`,
//     methods: {
//         handleSave: action("HANDLE_SAVE")
//     },
//     data: () => ({
//         tags: <Tag[]>[
//             { text: "saida" },
//             { type: TagTypes.DANCE, text: "Kizomba fusion" },
//             { type: TagTypes.DANCE, text: "Semba" },
//             { text: "Obrót" },
//             { text: "Zatrzymanie" },
//             { type: TagTypes.DIFFICULTY, text: "Łatwe" }
//         ]
//     }),
//     props: {
//         step: {
//             default: <RawStep>{
//                 id: "fake-id",
//                 owner_uid: "fake-id",
//                 identifier: 12,
//                 name: "Męska grande-saida z zatrzymaniem partnerki",
//                 url:
//                     "https://photos.google.com/album/AF1QipNTAEGC9YX061avn20xbsScj96oNJ9aftjWl6HV/photo/AF1QipO5CoOhRC6xNRncPGfxWjb-o28QuuBTGoVoPSKO",
//                 tags: [{ text: "Grande saida" }, { text: "Zatrzymanie" }],
//                 difficulty: 3,
//                 dance: ["semba"],
//                 created_at: Date.now()
//             }
//         }
//     }
// });
