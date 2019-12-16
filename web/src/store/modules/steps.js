import * as tslib_1 from "tslib";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Container } from "typedi";
import { StepsResource } from "@/lib/steps.resource";
const stepsResource = Container.get(StepsResource);
let StepsModule = class StepsModule extends VuexModule {
    constructor() {
        super(...arguments);
        this.steps = [];
        this.query = "";
    }
    setSteps(steps) {
        this.steps = steps;
    }
    async getAllSteps() {
        return stepsResource.query();
    }
};
tslib_1.__decorate([
    Mutation,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", void 0)
], StepsModule.prototype, "setSteps", null);
tslib_1.__decorate([
    Action({ commit: "setSteps" }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StepsModule.prototype, "getAllSteps", null);
StepsModule = tslib_1.__decorate([
    Module({ name: "steps" })
], StepsModule);
export { StepsModule };
//# sourceMappingURL=steps.js.map