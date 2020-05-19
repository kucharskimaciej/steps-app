import { Service } from "vue-typedi";
import { StepDuplicateLocator } from "@/lib/duplicateLocator.interface";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";
import store from "@/store";

@Service(StepsByUrlDuplicateLocatorToken)
export class StepsByUrlDuplicateLocator implements StepDuplicateLocator {
  private readonly steps = getModule(StepsModule, store);

  isDuplicate(urls: string[], ignoreId = ""): boolean {
    return Boolean(this.getDuplicate(urls, ignoreId));
  }

  getDuplicate(urls: string[], ignoreId = "") {
    return this.steps.rawSteps.find(
      step => ignoreId !== step.id && this.hasCommonValue(urls, step.videos)
    );
  }

  hasCommonValue(a: string[], b: string[]): boolean {
    return a.some(url => b.includes(url));
  }
}
