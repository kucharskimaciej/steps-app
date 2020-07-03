import { Service } from "vue-typedi";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { provideStore } from "@/store";
import { VideoObject } from "../../../common/types/VideoObject";

@Service(StepsDuplicateLocatorToken)
export class StepsByHashDuplicateLocator implements StepDuplicateLocator {
  isDuplicate(key: VideoObject, ignoreId = ""): boolean {
    return Boolean(this.getDuplicate(key, ignoreId));
  }

  getDuplicate(key: VideoObject, ignoreId = "") {
    return provideStore().state.steps.rawSteps.find(
      step =>
        ignoreId !== step.id &&
        step.videos.some(video => video.hash === key.hash)
    );
  }
}
