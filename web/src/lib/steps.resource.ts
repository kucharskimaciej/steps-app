import { Service } from "vue-typedi";
import { RawStep } from "../../../common/types/Step";
import { createVariationId } from "@/lib/variations/variationId";
import { Resource } from "@/lib/resource.class";

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
export class StepsResource extends Resource<
  RawStep,
  CreateParams,
  UpdateParams
> {
  protected readonly collection = this.firestore.collection("steps");

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
}
