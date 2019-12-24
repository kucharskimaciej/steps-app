import { Service } from "typedi";
import { FirebaseService } from "@/lib/firebase.service";
import { User } from "../../../common/types/User";

@Service()
export class UserResource {
    private readonly collection = this.firebase.db.collection("users");

    constructor(private firebase: FirebaseService) {}

    fetch(uid: string): Promise<User> {
        return this.collection
            .doc(uid)
            .get()
            .then(response => response.data() as User || { practice: [] });
    }

    async upsert(uid: string, params: Partial<User>): Promise<User> {
        await this.collection.doc(uid).set(params, { merge: true });
        return this.fetch(uid);
    }
}
