import { ReadonlyRecord } from "./types/helperTypes";
import { StepDifficulty, StepKind } from "./types/Step";

export const STEP_DIFFICULTIES: ReadonlyRecord<StepDifficulty, string> = {
  1: "Very easy",
  2: "Easy",
  3: "Intermediate",
  5: "Hard",
  8: "Very hard",
};

export const KINDS: ReadonlyRecord<StepKind, string> = {
  step: "Step",
  inspiration: "Inspiration",
  routine: "Routine",
} as const;
