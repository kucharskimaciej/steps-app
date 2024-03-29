import { Service } from "typedi";
import { StepDTO } from "../../../common/types/Step";
import { FilteredResult } from "@/lib/StepSearch/types";
import Fuse from "fuse.js";

@Service()
export class QuerySearchService {
  getMatchingItemsWithScore(
    steps: StepDTO[],
    query?: string
  ): FilteredResult[] {
    if (query) {
      const searcher = new Fuse(steps, {
        keys: ["name"],
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true,
        shouldSort: false,
        threshold: 0.4,
      });

      return searcher.search(query);
    } else {
      return steps.map((item) => ({ item, score: 0 }));
    }
  }
}
