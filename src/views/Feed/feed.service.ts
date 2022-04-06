import { Service } from "typedi";
import { shuffle, orderBy, first } from "lodash";
import { Step } from "../../../common/types/Step";

@Service()
export class FeedService {
  getStepIdsWithPreset(preset: FeedPresets, steps: Step[]): string[] {
    let selectedSteps: Step[];

    switch (preset) {
      case FeedPresets.RANDOM:
        selectedSteps = shuffle(steps);
        break;
      case FeedPresets.NEVER_PRACTICED:
        selectedSteps = orderBy(
          steps.filter(
            (step) =>
              !step.practice_records || step.practice_records.length === 0
          ),
          ["updated_at"],
          ["desc"]
        );
        break;
      case FeedPresets.PRACTICED_ASC:
        selectedSteps = orderBy(
          steps.filter((step) => step.practice_records?.length),
          [(step) => first(step.practice_records)?.date || 0, "updated_at"],
          ["asc", "desc"]
        );
        break;

      case FeedPresets.PRACTICED_DESC:
        selectedSteps = orderBy(
          steps.filter((step) => step.practice_records?.length),
          [(step) => first(step.practice_records)?.date || 0, "updated_at"],
          ["desc", "desc"]
        );
        break;

      case FeedPresets.RECENTLY_ADDED:
        selectedSteps = orderBy(steps, ["created_at"], ["desc"]);
        break;

      case FeedPresets.LEAST_RECENTLY_VIEWED:
        selectedSteps = orderBy(
          steps,
          [(step) => first(step.view_records), "updated_at"],
          ["asc", "desc"]
        );
        break;

      case FeedPresets.LEAST_VIEWED:
        selectedSteps = orderBy(
          steps,
          [(step) => step.view_records?.length || 0, "updated_at"],
          ["asc", "desc"]
        );
        break;
    }

    return selectedSteps.map((step) => step.id);
  }
}

export enum FeedPresets {
  LEAST_RECENTLY_VIEWED = "LEAST_RECENTLY_VIEWED",
  LEAST_VIEWED = "LEAST_VIEWED",
  RANDOM = "RANDOM",
  NEVER_PRACTICED = "NEVER_PRACTICED",
  PRACTICED_DESC = "PRACTICED_DESC",
  PRACTICED_ASC = "PRACTICED_ASC",
  RECENTLY_ADDED = "RECENTLY_ADDED",
}
