import { StepDTO, Step } from "../../../common/types/Step";
import { convertToStep } from "@/lib/rawStepHelpers";
import { groupBy } from "lodash";

export function rawStepsFactory(): StepDTO[] {
  return [
    {
      id: "step-id-1",
      kind: "step",
      owner_uid: "owner-id-1",
      identifier: 1,
      name: "Męska grande-saida z zatrzymaniem partnerki",
      videos: [
        {
          url: "https://example.com/videos/hash-1",
          hash: "hash-1",
        },
      ],
      tags: ["Grande saida", "Zatrzymanie"],
      difficulty: 3,
      feeling: ["semba"],
      created_at: Date.now(),
      artists: [],
      notes: "",
      smart_tags: [],
      removed_smart_tags: [],
      tokens: [],
      variationKey: "A",
    },
    {
      id: "step-id-2",
      kind: "step",
      owner_uid: "owner-id-1",
      identifier: 2,
      name: "Tepy na 4 kroku saidy damskej + przesunięcie nogi, a potem dodatkowe przejścia",
      videos: [
        {
          url: "https://example.com/videos/hash-2",
          hash: "hash-2",
        },
      ],
      tags: ["Tep", "Przesunięcie nogi"],
      difficulty: 3,
      feeling: ["kizomba"],
      created_at: Date.now(),
      artists: ["Nowak & Majchrowska"],
      notes: "",
      smart_tags: [],
      removed_smart_tags: [],
      tokens: [],
      variationKey: "A",
    },
    {
      id: "step-id-3",
      owner_uid: "owner-id-1",
      identifier: 3,
      kind: "step",
      name: "Płynny obrót z przejściem przez shadow position",
      videos: [
        {
          url: "https://example.com/videos/hash-3",
          hash: "hash-3",
        },
      ],
      tags: [],
      difficulty: 3,
      feeling: ["kizomba"],
      created_at: Date.now(),
      artists: ["Nowak & Majchrowska"],
      notes: "",
      smart_tags: ["Shadow position"],
      removed_smart_tags: ["Obrót"],
      tokens: [],
      variationKey: "B",
    },
    {
      id: "step-id-1",
      owner_uid: "owner-id-1",
      identifier: 4,
      kind: "routine",
      name: "Ten krok ma wiele wideo",
      videos: [
        {
          url: "https://example.com/videos/hash-1",
          hash: "hash-1",
        },
        {
          url: "https://example.com/videos/hash-2",
          hash: "hash-2",
        },
        {
          url: "https://example.com/videos/hash-3",
          hash: "hash-3",
        },
      ],
      tags: ["Grande saida", "Zatrzymanie"],
      difficulty: 3,
      feeling: ["semba"],
      created_at: Date.now(),
      artists: [],
      notes: "",
      smart_tags: [],
      removed_smart_tags: [],
      tokens: [],
      variationKey: "A",
    },
  ];
}

export function rawStepFactory(n = 0): StepDTO {
  return rawStepsFactory()[n];
}

export function stepsFactory(rawSteps: StepDTO[] = rawStepsFactory()): Step[] {
  const variationsByKey = groupBy(rawSteps, "variationKey");
  return rawSteps.map((rawStep) => convertToStep(rawStep, variationsByKey));
}

export function stepFactory(n = 0): Step {
  return stepsFactory()[n];
}
