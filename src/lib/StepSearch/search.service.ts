import { Inject, Service } from "typedi";
import { StepDTO } from "../../../common/types/Step";
import { Search, SearchFilters } from "@/features/Search/types";
import { QuerySearchService } from "@/lib/StepSearch/querySearch.service";
import { SortResultsService } from "@/lib/StepSearch/sortResults.service";

export type Matcher = (step: StepDTO) => boolean;

// @todo: extract filtering logic into separate service
@Service()
export class SearchService {
  @Inject(() => QuerySearchService)
  querySearch!: QuerySearchService;

  @Inject(() => SortResultsService)
  sorter!: SortResultsService;

  search(steps: StepDTO[], { filters, sort }: Search): StepDTO["id"][] {
    const stepsMatchingFilters = steps.filter(
      SearchService.makeMatcher(filters)
    );

    const resultsMatchingQuery = this.querySearch.getMatchingItemsWithScore(
      stepsMatchingFilters,
      filters.query
    );

    const sortedResults = this.sorter.sortResults(resultsMatchingQuery, {
      filters,
      sort,
    });

    return sortedResults.map((result) => result.id);
  }

  static makeMatcher(filters: Omit<SearchFilters, "query">): Matcher {
    const matchers: Matcher[] = [
      SearchService.makeIncludeAllTagsMatcher(filters.includeAllTags),
      SearchService.makeExcludeAnyTagsMatcher(filters.excludeAnyTags),
      SearchService.makeArtistsMatcher(filters.anyArtists),
      SearchService.makeFeelingsMatcher(filters.feeling),
    ];

    return (step) => matchers.every((matcher) => matcher(step));
  }

  static makeIncludeAllTagsMatcher(
    includeAllTags: SearchFilters["includeAllTags"]
  ): Matcher {
    return (step) =>
      includeAllTags.every(
        (tag) => step.tags.includes(tag) || step.smart_tags.includes(tag)
      );
  }

  static makeExcludeAnyTagsMatcher(
    excludeAnyTags: SearchFilters["excludeAnyTags"]
  ): Matcher {
    return (step) =>
      !excludeAnyTags.some(
        (excludedTag) =>
          step.tags.includes(excludedTag) ||
          step.smart_tags.includes(excludedTag)
      );
  }

  static makeArtistsMatcher(artists: SearchFilters["anyArtists"]): Matcher {
    return (step) => {
      if (!artists.length) {
        return true;
      }

      return artists.some((artist) => step.artists.includes(artist));
    };
  }

  static makeFeelingsMatcher(feelings: SearchFilters["feeling"]): Matcher {
    return (step) => {
      const positiveFeelings = feelings
        .filter(([, value]) => value === 1)
        .map(([feeling]) => feeling);

      const negativeFeelings = feelings
        .filter(([, value]) => value === -1)
        .map(([feeling]) => feeling);

      return (
        (positiveFeelings.length === 0 ||
          positiveFeelings.some((feeling) => step.feeling.includes(feeling))) &&
        !negativeFeelings.some((feeling) => step.feeling.includes(feeling))
      );
    };
  }
}
