import { intersection } from "lodash";
import { RawStep } from "../../../common/types/Step";

export type StepForScoring = Pick<RawStep, "tags" | "tokens">;
export type ScoringFn = (
  stepA: StepForScoring,
  stepB: StepForScoring
) => number;

export function scoreToken(token: string): number {
  return token.split("|").length ** 2;
}

export function scoreTag(_: unknown, multiplier: number): number {
  return multiplier * 10;
}

function score(
  elements: string[],
  scoringFn: (el: string, index: number) => number
): number {
  return elements.reduce(
    (total, el, index) => total + scoringFn(el, index + 1),
    0
  );
}

export const getTokensScore: ScoringFn = (stepA, stepB) =>
  score(intersection(stepA.tokens, stepB.tokens), scoreToken);

export const getTagsScore: ScoringFn = (stepA, stepB) =>
  score(intersection(stepA.tags, stepB.tags), scoreTag);

export const getStepScore: ScoringFn = (stepA, stepB) =>
  getTokensScore(stepA, stepB) + getTagsScore(stepA, stepB);
