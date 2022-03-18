import { Service } from "vue-typedi";
import { StepDTO } from "../../common/types/Step";
import { createVariationId } from "@/lib/variations/variationId";
import { Resource } from "@/lib/resource.class";

type EditableFields =
  | "feeling"
  | "difficulty"
  | "videos"
  | "name"
  | "tags"
  | "artists"
  | "notes"
  | "smart_tags"
  | "removed_smart_tags"
  | "practice_records"
  | "view_records"
  | "kind"
  | "tokens";

export type CreateParams = Pick<
  StepDTO,
  EditableFields | "owner_uid" | "identifier"
>;

export type UpdateParams = Partial<
  Pick<StepDTO, EditableFields | "variationKey">
>;

@Service()
export class StepsResource extends Resource<
  StepDTO,
  CreateParams,
  UpdateParams
> {
  protected readonly collection = this.firestore.collection("steps");

  public async create(
    params: CreateParams,
    variationsToMerge?: string[]
  ): Promise<StepDTO> {
    const variationKey = createVariationId();

    const stepToSave: Omit<StepDTO, "id"> = {
      ...params,
      created_at: Date.now(),
      variationKey
    };

    const batch = await this.createBatchVariationUpdate(
      params.owner_uid,
      variationKey,
      variationsToMerge
    );

    const documentRef = this.collection.doc();
    batch.set(documentRef, stepToSave);
    await batch.commit();

    return documentRef.get().then(this.toDocument);
  }

  public async update(
    id: string,
    params: UpdateParams,
    variationKey: string = createVariationId(),
    variationsToMerge?: string[]
  ): Promise<StepDTO> {
    if (!variationsToMerge || !variationsToMerge.length) {
      variationsToMerge = [variationKey];
    }

    const documentRef = this.collection.doc(id);

    const originalDocument = await documentRef.get().then(this.toDocument);

    const batch = await this.createBatchVariationUpdate(
      originalDocument.owner_uid,
      variationKey,
      variationsToMerge
    );

    batch.set(documentRef, { ...params, variationKey }, { merge: true });
    await batch.commit();

    return documentRef.get().then(this.toDocument);
  }

  private async createBatchVariationUpdate(
    owner_uid: string,
    newVariationKey: string,
    variationsToMerge: string[] = []
  ): Promise<firebase.firestore.WriteBatch> {
    const documentsToUpdate =
      variationsToMerge.length > 0
        ? await this.collection
            .where("owner_uid", "==", owner_uid)
            .where("variationKey", "in", variationsToMerge)
            .get()
        : [];

    const batch = this.firestore.db.batch();

    documentsToUpdate.forEach(document => {
      batch.update(document.ref, { variationKey: newVariationKey });
    });

    return batch;
  }
}
