import { Service } from "typedi";
import { FirebaseService } from "@/lib/firebase.service";
import { Step } from "../../../types/Step";

@Service()
export class StepsResource {
    private readonly collection = this.firebase.db.collection("steps");

    constructor(private firebase: FirebaseService) {}

    public async query(query?: any): Promise<Step[]> {
        const querySnapshot = await this.collection.get(query);
        return querySnapshot.docs.map(d => d.data() as Step);
    }
}
