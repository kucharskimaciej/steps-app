import { Service } from "vue-typedi";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { StepsDuplicateLocatorToken } from "@/lib/tokens";
import store from "@/store";
import { VideoObject } from "../../../common/types/VideoObject";

@Service(StepsDuplicateLocatorToken)
export class StepsByHashDuplicateLocator implements StepDuplicateLocator {
  private readonly steps = getModule(StepsModule, store);

  isDuplicate(key: VideoObject, ignoreId = ""): boolean {
    return Boolean(this.getDuplicate(key, ignoreId));
  }

  getDuplicate(key: VideoObject, ignoreId = "") {
    return this.steps.rawSteps.find(
      step =>
        ignoreId !== step.id &&
        step.videos.some(video => video.hash === key.hash)
    );
  }
}
