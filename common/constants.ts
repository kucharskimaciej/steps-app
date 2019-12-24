import { ReadonlyRecord } from "./types/helperTypes";
import { Dance, StepDifficulty } from "./types/Step";

export const STEP_DIFFICULTIES: ReadonlyRecord<StepDifficulty, string> = {
  1: "Very easy",
  2: "Easy",
  3: "Intermediate",
  5: "Hard",
  8: "Very hard"
};

export const DANCES: ReadonlyRecord<Dance, string> = {
  semba: "Semba",
  kizomba: "Kizomba",
  tarraxa: "Tarraxa",
  fusion: "Kizomba fusion",
  urban: "Urban Kizz"
};
