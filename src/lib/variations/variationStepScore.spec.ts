import {
  getStepScore,
  getTagsScore,
  getTokensScore,
  scoreTag,
  scoreToken,
  StepForScoring,
} from "@/lib/variations/variationStepScore";

import { TokenizeService } from "../tokenize.service";

describe("#scoreTag", () => {
  [
    [1, 10],
    [2, 20],
    [5, 50],
  ].forEach(([multiplier, result]) => {
    it(`should return ${result} for n = ${multiplier}`, () => {
      expect(scoreTag("tag", multiplier)).toEqual(result);
    });
  });
});

describe("#scoreToken", () => {
  (
    [
      ["A", 1],
      ["A|B", 4],
      ["A|B|C", 9],
      ["A|B|C|D", 16],
    ] as [string, number][]
  ).forEach(([token, result]) => {
    it(`should return ${result} for token "${token}"`, () => {
      expect(scoreToken(token)).toEqual(result);
    });
  });
});

describe("#getTokensScore", () => {
  const tokenizer = new TokenizeService();

  (
    [
      [{ tags: [], tokens: ["a", "b"] }, { tags: [], tokens: ["c"] }, 0],
      [{ tags: [], tokens: ["a", "b"] }, { tags: [], tokens: ["a", "c"] }, 1],
      [
        { tags: [], tokens: tokenizer.tokenize("aaa bbb") },
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc") },
        6,
      ],
      [
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc ddd") },
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc") },
        20,
      ],
      [
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc ddd eee") },
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc ddd") },
        50,
      ],
      [
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc ddd eee fff") },
        { tags: [], tokens: tokenizer.tokenize("aaa bbb ccc ddd eee") },
        80,
      ],
    ] as [StepForScoring, StepForScoring, number][]
  ).forEach(([stepA, stepB, result]) => {
    it(`returns ${result} for (${stepA.tokens.join(
      ", "
    )}) && (${stepB.tokens.join(", ")})`, () => {
      expect(getTokensScore(stepA, stepB)).toEqual(result);
    });
  });
});

describe("#getTagsScore", () => {
  (
    [
      [{ tags: ["a", "b"], tokens: [] }, { tags: ["c"], tokens: [] }, 0],
      [{ tags: ["a", "b"], tokens: [] }, { tags: ["a"], tokens: [] }, 10],
      [{ tags: ["a", "b"], tokens: [] }, { tags: ["a", "b"], tokens: [] }, 30],
      [
        { tags: ["a", "b", "c"], tokens: [] },
        { tags: ["a", "b", "c"], tokens: [] },
        60,
      ],
    ] as [StepForScoring, StepForScoring, number][]
  ).forEach(([stepA, stepB, result]) => {
    it(`returns ${result} for (${stepA.tags.join(", ")}) && (${stepB.tags.join(
      ", "
    )})`, () => {
      expect(getTagsScore(stepA, stepB)).toEqual(result);
    });
  });
});

describe("#getStepScore", () => {
  const tokenizer = new TokenizeService();

  (
    [
      [
        { tags: ["a", "b"], tokens: tokenizer.tokenize("aaa bbb") },
        { tags: ["c"], tokens: tokenizer.tokenize("ccc") },
        0,
      ],
      [
        { tags: ["a", "b"], tokens: tokenizer.tokenize("aaa bbb ccc ddd") },
        { tags: ["a", "b"], tokens: tokenizer.tokenize("aaa bbb ccc") },
        50,
      ],
      [
        {
          tags: ["a", "b", "c"],
          tokens: tokenizer.tokenize("aaa bbb ccc ddd eee fff"),
        },
        {
          tags: ["a", "b", "c"],
          tokens: tokenizer.tokenize("aaa bbb ccc ddd eee"),
        },
        140,
      ],
    ] as [StepForScoring, StepForScoring, number][]
  ).forEach(([stepA, stepB, result]) => {
    it(`returns correct result`, () => {
      expect(getStepScore(stepA, stepB)).toEqual(result);
    });
  });
});
