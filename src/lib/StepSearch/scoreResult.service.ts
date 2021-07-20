import { Service } from "vue-typedi";
import { FilteredResult } from "@/lib/StepSearch/types";
import { SearchFilters } from "@/components/FullSearch/types";

@Service()
export class ScoreResultService {
  static readonly PERFECT_MATCH_SCORE = 200;
  static readonly TAG_MATCH_SCORE = 20;
  static readonly FEELING_MATCH_SCORE = 20;

  score({ item, score }: FilteredResult, filters: SearchFilters): number {
    const normalizedInitialScore =
      (1 - (score || 0)) * ScoreResultService.PERFECT_MATCH_SCORE;

    const tagMatchScore = filters.includeAllTags.reduce((total, tag) => {
      if (item.tags.includes(tag) || item.smart_tags.includes(tag)) {
        return total + ScoreResultService.TAG_MATCH_SCORE;
      }

      return total;
    }, 0);

    const feelingMatchScore = filters.feeling.reduce(
      (total, [feeling, value]) => {
        if (value !== 1) {
          return total;
        }

        if (item.feeling.includes(feeling)) {
          return total + ScoreResultService.FEELING_MATCH_SCORE;
        }

        return total;
      },
      0
    );

    return normalizedInitialScore + tagMatchScore + feelingMatchScore;
  }
}
