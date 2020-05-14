import { Service } from "vue-typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { RawStep } from "../../../common/types/Step";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";
import store from "@/store";
import { partial } from "lodash";

@Service(StepsByUrlDuplicateLocatorToken)
export class StepsByUrlDuplicateLocator
  implements DuplicateLocator<RawStep, string> {
  private readonly steps = getModule(StepsModule, store);

  isDuplicate(url: string, ignoreId = ""): boolean {
    return this.steps.rawSteps.some(
      partial(this.isDuplicatePredicate, url, ignoreId)
    );
  }

  getDuplicate(url: string, ignoreId = "") {
    return this.steps.rawSteps.find(
      partial(this.isDuplicatePredicate, url, ignoreId)
    );
  }

  private isDuplicatePredicate(
    url: string,
    ignoreId: string,
    step: RawStep
  ): boolean {
    return (
      ignoreId !== step.id && step.videos.some(videoUrl => videoUrl === url)
    );
  }
}
