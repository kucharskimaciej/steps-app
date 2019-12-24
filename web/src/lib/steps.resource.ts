import { Service } from "typedi";
import { FirebaseService } from "@/lib/firebase.service";
import { RawStep } from "../../../common/types/Step";

export type CreateParams = Pick<
    RawStep,
    "identifier" | "dance" | "difficulty" | "url" | "name" | "tags" | "owner_uid"
>;

@Service()
export class StepsResource {
    private readonly collection = this.firebase.db.collection("steps");

    constructor(private firebase: FirebaseService) {}

    public async query(query?: any): Promise<RawStep[]> {
        const querySnapshot = await this.collection.get(query);
        return querySnapshot.docs.map(d => ({
            ...d.data(),
            id: d.id
        } as RawStep));
    }

    public async create(params: CreateParams): Promise<RawStep> {
        const stepToSave: Omit<RawStep, "id"> = {
            ...params,
            created_at: Date.now()
        };

        const documentRef = await this.collection.add(stepToSave);
        return documentRef.get().then(result => ({
            ...result.data(),
            id: documentRef.id
        } as RawStep));
    }
}
