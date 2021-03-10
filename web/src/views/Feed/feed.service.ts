import { Service } from "vue-typedi";
import { shuffle, take, sortBy, first } from "lodash";
import { Step } from "../../../../common/types/Step";

@Service()
export class FeedService {
  getStepsForFeed(steps: Step[], count = 10): Step[] {
    return take(shuffle(steps), count);
  }

  getStepIdsWithPreset(preset: FeedPresets, steps: Step[]): string[] {
    let selectedSteps: Step[];

    switch (preset) {
      case FeedPresets.RANDOM:
        selectedSteps = shuffle(steps);
        break;
      case FeedPresets.NEVER_PRACTICED:
        selectedSteps = sortBy(
          steps.filter(
            step => !step.practice_records || step.practice_records.length === 0
          ),
          ["-updated_at"]
        );
        break;
      case FeedPresets.PRACTICED_ASC:
        selectedSteps = sortBy(
          steps.filter(step => step.practice_records?.length),
          [step => -first(step.practice_records)!.date, "-updated_at"]
        );
        break;

      case FeedPresets.PRACTICED_DESC:
        selectedSteps = sortBy(
          steps.filter(step => step.practice_records?.length),
          [step => first(step.practice_records)!.date, "-updated_at"]
        );
        break;

      case FeedPresets.RECENTLY_ADDED:
        selectedSteps = sortBy(steps, ["-created_at"]);
        break;
    }

    return selectedSteps.map(step => step.id);
  }
}

export enum FeedPresets {
  RANDOM = "RANDOM",
  NEVER_PRACTICED = "NEVER_PRACTICED",
  PRACTICED_DESC = "PRACTICED_DESC",
  PRACTICED_ASC = "PRACTICED_ASC",
  RECENTLY_ADDED = "RECENTLY_ADDED"
}
