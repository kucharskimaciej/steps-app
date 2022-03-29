import { Inject, Service } from "vue-typedi";
import { FilteredResult } from "@/lib/StepSearch/types";
import { Search, SortDirection, SortType } from "@/features/Search/types";
import { RawStep } from "../../../common/types/Step";
import { first, orderBy, shuffle } from "lodash";
import { ScoreResultService } from "@/lib/StepSearch/scoreResult.service";
// @todo: each of sort types should be a separate strategy
@Service()
export class SortResultsService {
  @Inject()
  scorer!: ScoreResultService;

  sortResults(results: FilteredResult[], { sort, filters }: Search): RawStep[] {
    let sortedResults: FilteredResult[];
    const sortDirection =
      sort.direction === SortDirection.DESCENDING ? "desc" : "asc";
    const reverseSortDirection =
      sort.direction === SortDirection.DESCENDING ? "asc" : "desc";

    switch (sort.type) {
      case SortType.RANDOM:
        sortedResults = shuffle(results);
        break;

      case SortType.ADDED_DATE:
        sortedResults = orderBy(
          results,
          [({ item }) => item.created_at],
          [sortDirection]
        );
        break;

      case SortType.VIEW_COUNT:
        sortedResults = orderBy(
          results,
          [
            ({ item }) => item.view_records?.length || 0,
            ({ item }) => item.updated_at
          ],
          [sortDirection, reverseSortDirection]
        );
        break;

      case SortType.VIEW_DATE:
        sortedResults = orderBy(
          results,
          [
            ({ item }) => first(item.view_records),
            ({ item }) => item.updated_at
          ],
          [sortDirection, reverseSortDirection]
        );
        break;

      case SortType.PRACTICE_DATE:
        sortedResults = orderBy(
          results,
          [
            ({ item }) => first(item.practice_records)?.date ?? 0,
            ({ item }) => item.updated_at
          ],
          [sortDirection, reverseSortDirection]
        );
        break;

      case SortType.SCORE:
        sortedResults = orderBy(
          results.map(result => ({
            item: result.item,
            score: this.scorer.score(result, filters)
          })),
          ["score"],
          [sortDirection]
        );

        break;
    }

    return sortedResults.map(result => result.item);
  }
}
