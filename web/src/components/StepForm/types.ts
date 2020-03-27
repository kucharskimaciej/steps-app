import { RawStep } from "../../../../common/types/Step";

export type StepFormData = Pick<
  RawStep,
  "url" | "name" | "difficulty" | "tags" | "dance" | "artists" | "notes"
>;

export interface StepFormApi {
  reset(): void;
}
