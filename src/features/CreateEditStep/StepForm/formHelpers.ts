import { minLength, required, helpers } from "@vuelidate/validators";
import { duplicate } from "@/lib/validators/duplicate";
import { oneOf } from "@/lib/validators/oneOf";
import { KINDS } from "../../../../common/constants";
import { Container } from "typedi";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { AppConfigToken } from "../../../../common/tokens";
import { StepDTO } from "../../../../common/types/Step";
import { StepFormData } from "@/features/CreateEditStep/StepForm/types";

export function stepFormValidationRules(step?: StepDTO) {
  const duplicateLocator = Container.get<StepDuplicateLocator>(
    StepsDuplicateLocatorToken
  );

  const appConfig = Container.get(AppConfigToken);

  return {
    videos: {
      required,
      minLength: minLength(1),
      $each: helpers.forEach({
        required,
        alwaysFails: () => {
          console.log("alwaysFails");

          return false;
        },
        duplicate: duplicate(duplicateLocator, step && step.id),
      }),
    },
    name: {
      required,
    },
    difficulty: {
      required,
      oneOf: oneOf(Object.keys(appConfig.difficulties).map(Number)),
    },
    kind: {
      required,
      oneOf: oneOf(Object.keys(KINDS)),
    },
    feeling: {
      required,
      minLength: minLength(1),
    },
    artists: {},
    tags: {
      minLength: minLength(1),
    },
    notes: {},
    smart_tags: {},
    removed_smart_tags: {},
    tokens: {},
  };
}

export function getDataObject(step: Partial<StepDTO> = {}): StepFormData {
  const {
    videos = [],
    name = "",
    difficulty = 1,
    feeling = [],
    kind = "step",
    tags = [],
    artists = [],
    notes = "",
    smart_tags = [],
    removed_smart_tags = [],
    tokens = [],
  } = step;

  return {
    videos,
    name,
    difficulty,
    feeling,
    kind,
    tags,
    artists,
    notes,
    smart_tags,
    removed_smart_tags,
    tokens,
  };
}
