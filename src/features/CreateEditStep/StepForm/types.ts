import { StepDTO } from "../../../../common/types/Step";

export type StepFormData = Pick<
  StepDTO,
  | "videos"
  | "name"
  | "difficulty"
  | "tags"
  | "feeling"
  | "kind"
  | "artists"
  | "notes"
  | "smart_tags"
  | "removed_smart_tags"
  | "tokens"
>;

export type PersistentFormData = Pick<
  StepFormData,
  "feeling" | "artists" | "tags" | "difficulty"
>;

export interface StepFormApi {
  reset(value?: Partial<StepFormData>): void;
  validate(): Promise<boolean>;
  getValue(): StepFormData;
}
