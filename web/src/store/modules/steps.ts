import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { StepsState } from "@/store/types";
import { Step } from "../../../../types/Step";
import { Container } from "typedi";
import { StepsResource } from "@/lib/steps.resource";

const stepsResource = Container.get(StepsResource);

@Module({ name: "steps" })
export class StepsModule extends VuexModule implements StepsState {
    public steps: Step[] = [];
    public query: string = "";

    @Mutation
    private SET_STEPS(steps: Step[]) {
        this.steps = steps;
    }

    @Action({ commit: "SET_STEPS" })
    public async fetchAllSteps() {
        return stepsResource.query();
    }
}
