import { Service } from "vue-typedi";
import { RawStep } from "../../../common/types/Step";
import { FilteredResult } from "@/lib/StepSearch/types";
import Fuse from "fuse.js";

@Service()
export class QuerySearchService {
  getMatchingItemsWithScore(
    steps: RawStep[],
    query?: string
  ): FilteredResult[] {
    if (query) {
      const searcher = new Fuse(steps, {
        keys: ["name"],
        includeScore: true,
        ignoreLocation: true,
        useExtendedSearch: true,
        shouldSort: false,
        threshold: 0.4
      });

      return searcher.search(query);
    } else {
      return steps.map(item => ({ item, score: 0 }));
    }
  }
}
