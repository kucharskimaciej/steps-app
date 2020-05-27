import { Service } from "vue-typedi";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";
import store from "@/store";

@Service(StepsByUrlDuplicateLocatorToken)
export class StepsByUrlDuplicateLocator implements StepDuplicateLocator {
  private readonly steps = getModule(StepsModule, store);

  isDuplicate(url: string, ignoreId = ""): boolean {
    return Boolean(this.getDuplicate(url, ignoreId));
  }

  getDuplicate(url: string, ignoreId = "") {
    return this.steps.rawSteps.find(
      step => ignoreId !== step.id && step.videos.includes(url)
    );
  }
}
