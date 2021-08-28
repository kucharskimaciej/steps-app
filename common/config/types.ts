import {
  ReadonlyRecord,
  TagMatcherDefinitionTuple
} from "common/types/helperTypes";
import { StepDifficulty } from "../types/Step";

export type AppConfig = {
  feelings: ReadonlyRecord<string, string>;
  difficulties: ReadonlyRecord<StepDifficulty, string>;
  smartTagMatchers: TagMatcherDefinitionTuple[];
};
