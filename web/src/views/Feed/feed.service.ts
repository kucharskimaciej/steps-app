import { Service } from "vue-typedi";
import { shuffle, take } from "lodash";
import { Step } from "../../../../common/types/Step";

@Service()
export class FeedService {
  getStepsForFeed(steps: Step[], count = 10): Step[] {
    return take(shuffle(steps), count);
  }
}
