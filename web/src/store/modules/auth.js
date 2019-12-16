import * as tslib_1 from "tslib";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
let AuthModule = class AuthModule extends VuexModule {
    constructor() {
        super(...arguments);
        this.uid = "";
    }
    get status() {
        return this.uid ? "AUTHENTICATED" : "NO_AUTH";
    }
    handleAuthStateChange(uid) {
        return uid;
    }
    setUid(uid) {
        this.uid = uid;
    }
};
tslib_1.__decorate([
    Action({ commit: "setUid" }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthModule.prototype, "handleAuthStateChange", null);
tslib_1.__decorate([
    Mutation,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthModule.prototype, "setUid", null);
AuthModule = tslib_1.__decorate([
    Module({ name: "auth" })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.js.map