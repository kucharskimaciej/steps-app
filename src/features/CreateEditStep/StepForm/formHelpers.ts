import { StepDTO } from "../../../../common/types/Step";
import { StepFormData } from "@/features/CreateEditStep/StepForm/types";

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
