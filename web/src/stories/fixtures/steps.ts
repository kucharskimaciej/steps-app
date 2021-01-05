import { RawStep, Step } from "../../../../common/types/Step";
import { convertToStep } from "@/lib/rawStepHelpers";
import { groupBy, partial } from "lodash";

export function rawStepsFactory(): RawStep[] {
  return [
    {
      id: "step-id-1",
      owner_uid: "owner-id-1",
      identifier: 1,
      name: "Męska grande-saida z zatrzymaniem partnerki",
      videos: [
        {
          url: "https://example.com/videos/hash-1",
          hash: "hash-1"
        }
      ],
      tags: ["Grande saida", "Zatrzymanie"],
      difficulty: 3,
      dance: ["semba"],
      created_at: Date.now(),
      artists: [],
      notes: "",
      smart_tags: [],
      removed_smart_tags: [],
      tokens: [],
      variationKey: "A"
    },
    {
      id: "step-id-2",
      owner_uid: "owner-id-1",
      identifier: 2,
      name:
        "Tepy na 4 kroku saidy damskej + przesunięcie nogi, a potem dodatkowe przejścia",
      videos: [
        {
          url: "https://example.com/videos/hash-2",
          hash: "hash-2"
        }
      ],
      tags: ["Tep", "Przesunięcie nogi"],
      difficulty: 3,
      dance: ["kizomba"],
      created_at: Date.now(),
      artists: ["Nowak & Majchrowska"],
      notes: "",
      smart_tags: [],
      removed_smart_tags: [],
      tokens: [],
      variationKey: "A"
    },
    {
      id: "step-id-3",
      owner_uid: "owner-id-1",
      identifier: 3,
      name: "Płynny obrót z przejściem przez shadow position",
      videos: [
        {
          url: "https://example.com/videos/hash-3",
          hash: "hash-3"
        }
      ],
      tags: [],
      difficulty: 3,
      dance: ["kizomba"],
      created_at: Date.now(),
      artists: ["Nowak & Majchrowska"],
      notes: "",
      smart_tags: ["Shadow position"],
      removed_smart_tags: ["Obrót"],
      tokens: [],
      variationKey: "B"
    },
    {
      id: "step-id-1",
      owner_uid: "owner-id-1",
      identifier: 4,
      name: "Ten krok ma wiele wideo",
      videos: [
        {
          url: "https://example.com/videos/hash-1",
          hash: "hash-1"
        },
        {
          url: "https://example.com/videos/hash-2",
          hash: "hash-2"
        },
        {
          url: "https://example.com/videos/hash-3",
          hash: "hash-3"
        }
      ],
      tags: ["Grande saida", "Zatrzymanie"],
      difficulty: 3,
      dance: ["semba"],
      created_at: Date.now(),
      artists: [],
      notes: "",
      smart_tags: [],
      removed_smart_tags: [],
      tokens: [],
      variationKey: "A"
    }
  ];
}

export function rawStepFactory(n = 0): RawStep {
  return rawStepsFactory()[n];
}

export function stepsFactory(rawSteps: RawStep[] = rawStepsFactory()): Step[] {
  const variationsByKey = groupBy(rawSteps, "variationKey");
  return rawSteps.map(partial(convertToStep, variationsByKey));
}

export function stepFactory(n = 0): Step {
  return stepsFactory()[n];
}
