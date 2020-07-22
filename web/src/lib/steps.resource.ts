import { Service } from "vue-typedi";
import { RawStep } from "../../../common/types/Step";
import { FirestoreService } from "@/lib/firebase/firestore.service";
import { DocumentSnapshot } from "@/lib/firebase/firebase";
import { createVariationId } from "@/lib/variations/variationId";

type EditableFields =
  | "dance"
  | "difficulty"
  | "videos"
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
  private readonly collection = this.firestore.collection("steps");

  constructor(private firestore: FirestoreService) {}

  public async query(uid: string): Promise<RawStep[]> {
    const querySnapshot = await this.collection
      .where("owner_uid", "==", uid)
      .get();
    return querySnapshot.docs.map(this.toDocument);
  }

  public async fetch(id: string): Promise<RawStep> {
    const snapshot = await this.collection.doc(id).get();
    return this.toDocument(snapshot);
  }

  public async create(
    params: CreateParams,
    variationsToMerge?: string[]
  ): Promise<RawStep> {
    const variationKey = createVariationId();

    const stepToSave: Omit<RawStep, "id"> = {
      ...params,
      created_at: Date.now(),
      variationKey
    };

    const documentRef = this.collection.doc();
    const documentsToUpdate =
      variationsToMerge && variationsToMerge.length > 0
        ? await this.collection
            .where("owner_uid", "==", params.owner_uid)
            .where("variationKey", "in", variationsToMerge)
            .get()
        : [];

    const batch = this.firestore.db.batch();

    batch.set(documentRef, stepToSave);

    documentsToUpdate.forEach(document => {
      batch.update(document.ref, { variationKey });
    });

    await batch.commit();

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
