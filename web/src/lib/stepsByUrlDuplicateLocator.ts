import { Service } from "typedi";
import { DuplicateLocator } from "@/lib/duplicateLocator.interface";
import { getModule } from "vuex-module-decorators";
import { StepsModule } from "@/store/modules/steps";
import { RawStep } from "../../../common/types/Step";
import { StepsByUrlDuplicateLocatorToken } from "@/lib/tokens";
import store from "@/store";

@Service(StepsByUrlDuplicateLocatorToken)
export class StepsByUrlDuplicateLocator
    implements DuplicateLocator<RawStep, string> {
    private readonly steps = getModule(StepsModule, store);

    isDuplicate(url: string): boolean {
        return !!this.steps.rawSteps.find(step => step.url === url);
    }

    getDuplicate(url: string) {
        return this.steps.rawSteps.find(step => step.url === url);
    }
}
