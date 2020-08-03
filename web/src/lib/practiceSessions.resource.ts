import { Service } from "vue-typedi";
import { PracticeSession } from "../../../common/types/PracticeSession";
import { Resource } from "@/lib/resource.class";
import { DateFilter } from "@/filters/date";

type EditableFields = "name" | "steps" | "status";
export type CreateParams = Pick<PracticeSession, "owner_uid">;
export type UpdateParams = Partial<Pick<PracticeSession, EditableFields>>;

@Service()
export class PracticeSessionsResource extends Resource<
  PracticeSession,
  CreateParams,
  UpdateParams
> {
  protected readonly collection = this.firestore.collection(
    "practice-sessions"
  );

  async create(params: CreateParams): Promise<PracticeSession> {
    const stepToSave: Omit<PracticeSession, "id"> = {
      ...params,
      status: "open",
      steps: [],
      name: `Practice ${DateFilter(Date.now())}`
    };

    const documentRef = await this.collection.add(stepToSave);
    return documentRef.get().then(this.toDocument);
  }
}
