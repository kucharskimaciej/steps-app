import { TagMatcherDefinitionTuple } from "common/types/helperTypes";

export type AppConfig = {
  feelings: Record<string, string>;
  smartTagMatchers: TagMatcherDefinitionTuple[];
};
