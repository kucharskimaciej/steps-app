import { StepDifficulty } from "../types/Step";
import {
  ReadonlyRecord,
  TagMatcherDefinitionTuple,
} from "../types/helperTypes";

export type AppConfig = {
  feelings: ReadonlyRecord<string, string>;
  difficulties: ReadonlyRecord<StepDifficulty, string>;
  smartTagMatchers: TagMatcherDefinitionTuple[];
};
