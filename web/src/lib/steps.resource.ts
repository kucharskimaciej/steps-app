import { Service } from "vue-typedi";
import { FirebaseService, DocumentSnapshot } from "@/lib/firebase.service";
import { RawStep } from "../../../common/types/Step";

type EditableFields =
  | "dance"
  | "difficulty"
  | "url"
  | "name"
  | "tags"
  | "artists"
  | "notes"
  | "smart_tags"
  | "removed_smart_tags"
  | "tokens";

export type CreateParams = Pick<
  RawStep,
  EditableFields | "owner_uid" | "identifier"
>;

export type UpdateParams = Partial<Pick<RawStep, EditableFields>>;

@Service()
export class StepsResource {
  private readonly collection = this.firebase.db.collection("steps");

  constructor(private firebase: FirebaseService) {}

  public async query(uid: string): Promise<RawStep[]> {
    const querySnapshot = await this.collection
      .where("owner_uid", "==", uid)
      .get();
    return querySnapshot.docs.map(this.toDocument);
  }

  public async create(params: CreateParams): Promise<RawStep> {
    const stepToSave: Omit<RawStep, "id"> = {
      ...params,
      created_at: Date.now()
    };

    const documentRef = await this.collection.add(stepToSave);
    return documentRef.get().then(this.toDocument);
  }

  public async update(id: string, update: UpdateParams): Promise<RawStep> {
    const documentRef = this.collection.doc(id);

    await documentRef.set(update, { merge: true });
    return documentRef.get().then(this.toDocument);
  }

  private toDocument(snapshot: DocumentSnapshot): RawStep {
    return {
      ...snapshot.data(),
      id: snapshot.id
    } as RawStep;
  }
}
