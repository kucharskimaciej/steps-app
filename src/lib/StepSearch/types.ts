import { RawStep } from "../../../common/types/Step";

export type FilteredResult = {
  item: RawStep;
  score?: number;
};

export type NormalizedScoreResult = FilteredResult & {
  _normalized: true;
};
