import { Service } from "vue-typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { RawStep } from "../../../../common/types/Step";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { VideoObject } from "../../../../common/types/VideoObject";
import { rawStepFactory } from "@/stories/fixtures/steps";

// default
@Service(StepsDuplicateLocatorToken)
export class NeverDuplicate implements DuplicateLocator<RawStep, VideoObject> {
  isDuplicate(key: VideoObject): boolean {
    return false;
  }

  getDuplicate(key: VideoObject): void | RawStep {
    return undefined;
  }
}

@Service()
export class AlwaysDuplicate implements DuplicateLocator<RawStep, VideoObject> {
  isDuplicate(key: VideoObject): boolean {
    return true;
  }

  getDuplicate(key: VideoObject): void | RawStep {
    return rawStepFactory() as RawStep;
  }
}
