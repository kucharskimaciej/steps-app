import { Service } from "typedi";
import type { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import { provideStore } from "@/store";
import type { VideoObject } from "../../common/types/VideoObject";

@Service(StepsDuplicateLocatorToken)
export class StepsByHashDuplicateLocator implements StepDuplicateLocator {
  constructor() {
    console.log("Locator init");
  }

  isDuplicate(key: VideoObject, ignoreId = ""): boolean {
    return Boolean(this.getDuplicate(key, ignoreId));
  }

  getDuplicate(key: VideoObject, ignoreId = "") {
    console.log("getDuplicate", key);
    return provideStore().state.steps.rawSteps.find(
      (step) =>
        ignoreId !== step.id &&
        step.videos.some((video) => video.hash === key.hash)
    );
  }
}
