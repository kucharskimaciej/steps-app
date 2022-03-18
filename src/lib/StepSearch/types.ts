import { StepDTO } from "../../../common/types/Step";

export type FilteredResult = {
  item: StepDTO;
  score?: number;
};

export type NormalizedScoreResult = FilteredResult & {
  _normalized: true;
};
