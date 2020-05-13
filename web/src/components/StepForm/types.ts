import { RawStep } from "../../../../common/types/Step";

export type StepFormData = Pick<
  RawStep,
  | "url"
  | "name"
  | "difficulty"
  | "tags"
  | "dance"
  | "artists"
  | "notes"
  | "smart_tags"
  | "removed_smart_tags"
  | "tokens"
>;

export interface StepFormApi {
  reset(): void;
  validate(): boolean;
  value: StepFormData;
}
