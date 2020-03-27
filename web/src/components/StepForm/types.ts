import { Dance, StepDifficulty } from "../../../../common/types/Step";

export type StepFormData = {
  url: string;
  name: string;
  difficulty: StepDifficulty;
  tags: string[];
  dance: Dance[];
  artists: string[];
};

export interface StepFormApi {
  reset(): void;
}
