import * as tslib_1 from "tslib";
import { Service } from "typedi";
import { FirebaseService } from "@/lib/firebase.service";
let StepsResource = class StepsResource {
    constructor(firebase) {
        this.firebase = firebase;
        this.collection = this.firebase.db.collection("steps");
    }
    async query(query) {
        const querySnapshot = await this.collection.get(query);
        return querySnapshot.docs.map(d => d.data());
    }
};
StepsResource = tslib_1.__decorate([
    Service(),
    tslib_1.__metadata("design:paramtypes", [FirebaseService])
], StepsResource);
export { StepsResource };
//# sourceMappingURL=steps.resource.js.map