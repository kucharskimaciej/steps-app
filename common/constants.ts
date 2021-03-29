import { ReadonlyRecord } from "./types/helperTypes";
import { Feeling, StepDifficulty, StepKind } from "./types/Step";

export const STEP_DIFFICULTIES: ReadonlyRecord<StepDifficulty, string> = {
  1: "Very easy",
  2: "Easy",
  3: "Intermediate",
  5: "Hard",
  8: "Very hard"
};

export const FEELINGS: ReadonlyRecord<Feeling, string> = {
  semba: "Semba",
  kizomba: "Kizomba",
  tarraxa: "Tarraxa",
  fusion: "Kizomba fusion",
  urban: "Urban Kizz",
  doucer: "Doucer"
};

export const KINDS: ReadonlyRecord<StepKind, string> = {
  step: "Step",
  inspiration: "Inspiration",
  routine: "Routine"
};
