import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { PracticeState } from "@/store/types";

@Module({ name: "practice" })
export class PracticeModule extends VuexModule implements PracticeState {
    public steps: string[] = [];

    @Action({ commit: "ADD_STEP" })
    addStep(stepId: string) {
        return stepId;
    }

    @Mutation
    private ADD_STEP(stepId: string) {
        this.steps.push(stepId);
    }
}
