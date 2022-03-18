import { Service } from "vue-typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { StepDTO } from "../../../common/types/Step";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { VideoObject } from "../../../common/types/VideoObject";
import { rawStepFactory } from "@/stories/fixtures/steps";

// default
@Service(StepsDuplicateLocatorToken)
export class NeverDuplicate implements DuplicateLocator<StepDTO, VideoObject> {
  isDuplicate(_key: VideoObject): boolean {
    return false;
  }

  getDuplicate(_key: VideoObject): void | StepDTO {
    return undefined;
  }
}

@Service()
export class AlwaysDuplicate implements DuplicateLocator<StepDTO, VideoObject> {
  isDuplicate(_key: VideoObject): boolean {
    return true;
  }

  getDuplicate(_key: VideoObject): void | StepDTO {
    return rawStepFactory() as StepDTO;
  }
}
