import { Matcher, SearchService } from "@/lib/StepSearch/search.service";
import { Feeling, StepDTO } from "../../../common/types/Step";
import { KeyValueTuple } from "@/components/Forms/TagsSelection/types";
import { SearchFilters } from "@/features/Search/types";

describe("Search service", () => {
  describe("specific filter matchers", () => {
    describe("includeAllTagsMatcher", () => {
      let matcher: Matcher;

      describe("with includeAllTags filter", () => {
        beforeEach(() => {
          matcher = SearchService.makeIncludeAllTagsMatcher(["a", "b"]);
        });

        it("returns true if step contains all tags", () => {
          expect(
            matcher(({
              tags: ["a", "b"],
              smart_tags: []
            } as unknown) as StepDTO)
          ).toBeTruthy();
        });

        it("returns true if step contains all tags as smart_tags", () => {
          expect(
            matcher(({
              tags: [],
              smart_tags: ["a", "b"]
            } as unknown) as StepDTO)
          ).toBeTruthy();
        });

        it("returns true if step contains all tags both as tags and smart_tags", () => {
          expect(
            matcher(({
              tags: ["a"],
              smart_tags: ["b"]
            } as unknown) as StepDTO)
          ).toBeTruthy();
        });

        it("returns false if any of the tags is missing", () => {
          expect(
            matcher(({
              tags: [],
              smart_tags: ["b"]
            } as unknown) as StepDTO)
          ).toBeFalsy();
        });
      });

      describe("without includeAllTags filter", () => {
        beforeEach(() => {
          matcher = SearchService.makeIncludeAllTagsMatcher([]);
        });

        it("returns true for any step", () => {
          expect(
            matcher(({
              tags: ["a", "b"],
              smart_tags: []
            } as unknown) as StepDTO)
          ).toBeTruthy();
        });
      });
    });

    describe("excludeAnyTagsMatcher", () => {
      let matcher: Matcher;

      describe("without excluded tags", () => {
        beforeEach(() => {
          matcher = SearchService.makeExcludeAnyTagsMatcher([]);
        });

        it("returns true for any steps with tags", () => {
          expect(
            matcher(({
              tags: ["a"],
              smart_tags: ["b"]
            } as unknown) as StepDTO)
          ).toBe(true);
        });

        it("returns true for step with no tags", () => {
          expect(
            matcher(({
              tags: [],
              smart_tags: []
            } as unknown) as StepDTO)
          ).toBe(true);
        });
      });
      describe("with excluded tags", () => {
        beforeEach(() => {
          matcher = SearchService.makeExcludeAnyTagsMatcher(["a", "b"]);
        });

        it("returns true for any steps with tags other than excluded", () => {
          expect(
            matcher(({
              tags: ["c"],
              smart_tags: ["d"]
            } as unknown) as StepDTO)
          ).toBe(true);
        });

        it("returns false for steps with any of the excluded tags in tags field", () => {
          expect(
            matcher(({
              tags: ["b"],
              smart_tags: []
            } as unknown) as StepDTO)
          ).toBe(false);
        });

        it("returns false for steps with any of the excluded tags in smart_tags", () => {
          expect(
            matcher(({
              tags: [],
              smart_tags: ["a"]
            } as unknown) as StepDTO)
          ).toBe(false);
        });
      });
    });

    describe("artistsMatcher", () => {
      let matcher: Matcher;

      describe("without artists specified", () => {
        beforeEach(() => {
          matcher = SearchService.makeArtistsMatcher([]);
        });

        it("returns true for any steps with artists", () => {
          expect(
            matcher(({
              artists: ["a", "b"]
            } as unknown) as StepDTO)
          ).toBe(true);
        });

        it("returns true for step with no artists", () => {
          expect(
            matcher(({
              artists: []
            } as unknown) as StepDTO)
          ).toBe(true);
        });
      });
      describe("with artists specified", () => {
        beforeEach(() => {
          matcher = SearchService.makeArtistsMatcher(["a", "b"]);
        });

        it("returns true when step contains at least one of the artists", () => {
          expect(
            matcher(({
              artists: ["a"]
            } as unknown) as StepDTO)
          ).toBe(true);
        });

        it("returns false for steps with no artists", () => {
          expect(
            matcher(({
              artists: []
            } as unknown) as StepDTO)
          ).toBe(false);
        });

        it("returns false for steps with artists other than specified", () => {
          expect(
            matcher(({
              artists: ["c"]
            } as unknown) as StepDTO)
          ).toBe(false);
        });
      });
    });

    describe("makeFeelingsMatcher", () => {
      let matcher: Matcher;

      describe("without any feeling filters", () => {
        beforeEach(() => {
          matcher = SearchService.makeFeelingsMatcher([]);
        });

        it("returns true for any steps with any feeling", () => {
          expect(
            matcher(({
              feeling: ["a", "b"]
            } as unknown) as StepDTO)
          ).toBe(true);
        });

        it("returns true for step with no feeling", () => {
          expect(
            matcher(({
              feeling: []
            } as unknown) as StepDTO)
          ).toBe(true);
        });
      });

      describe("with feeling filters", () => {
        describe("with only positive values specified", () => {
          beforeEach(() => {
            matcher = SearchService.makeFeelingsMatcher(([
              ["a", 1],
              ["b", 1]
            ] as unknown) as KeyValueTuple<Feeling>[]);
          });

          it("returns true when step has ANY of the feelings", () => {
            expect(
              matcher(({
                feeling: ["a"]
              } as unknown) as StepDTO)
            ).toBe(true);
          });

          it("returns false for steps that have NO of the feelings", () => {
            expect(
              matcher(({
                feeling: ["c"]
              } as unknown) as StepDTO)
            ).toBe(false);
          });
        });

        describe("with only negative values specified", () => {
          beforeEach(() => {
            matcher = SearchService.makeFeelingsMatcher(([
              ["a", -1],
              ["b", -1]
            ] as unknown) as KeyValueTuple<Feeling>[]);
          });

          it("returns false when step has ANY of the feelings", () => {
            expect(
              matcher(({
                feeling: ["a"]
              } as unknown) as StepDTO)
            ).toBe(false);
          });

          it("returns false for steps that have NO of the feelings", () => {
            expect(
              matcher(({
                feeling: ["c"]
              } as unknown) as StepDTO)
            ).toBe(true);
          });
        });

        describe("with mixed values specified", () => {
          beforeEach(() => {
            matcher = SearchService.makeFeelingsMatcher(([
              ["a", 1],
              ["b", 1],
              ["c", -1],
              ["d", -1]
            ] as unknown) as KeyValueTuple<Feeling>[]);
          });

          it("returns true when step has ANY of the positive feelings and NONE of the negative", () => {
            expect(
              matcher(({
                feeling: ["a"]
              } as unknown) as StepDTO)
            ).toBe(true);
          });

          it("returns false is step has NONE of the positive feelings", () => {
            expect(
              matcher(({
                feeling: ["f"]
              } as unknown) as StepDTO)
            ).toBe(false);
          });

          it("returns false for steps that have some of the positive and negative feelings", () => {
            expect(
              matcher(({
                feeling: ["a", "c"]
              } as unknown) as StepDTO)
            ).toBe(false);
          });
        });
      });
    });
  });
  describe("filters matcher", () => {
    type FiltersStepResult = {
      filters: Omit<SearchFilters, "query">;
      step: StepDTO;
      result: boolean;
    };

    ([
      {
        filters: {
          includeAllTags: [],
          anyArtists: [],
          excludeAnyTags: [],
          feeling: []
        },
        step: ({
          tags: ["tagA"],
          smart_tags: ["tagB"],
          artists: ["artist"],
          feeling: []
        } as unknown) as StepDTO,
        result: true
      },
      {
        filters: {
          includeAllTags: ["tagA", "tagB"],
          anyArtists: ["artist"],
          excludeAnyTags: [],
          feeling: []
        },
        step: ({
          tags: ["tagA"],
          smart_tags: ["tagB"],
          artists: ["artist"],
          feeling: []
        } as unknown) as StepDTO,
        result: true
      },
      {
        filters: {
          includeAllTags: ["tagA", "tagC"],
          anyArtists: ["artist"],
          excludeAnyTags: [],
          feeling: []
        },
        step: ({
          tags: ["tagA"],
          smart_tags: ["tagB"],
          artists: ["artist"],
          feeling: []
        } as unknown) as StepDTO,
        result: false
      }
    ] as FiltersStepResult[]).forEach(({ filters, step, result }) => {
      it("returns a correct result", () => {
        const matcher = SearchService.makeMatcher(filters);

        expect(matcher(step)).toBe(result);
      });
    });
  });
});
