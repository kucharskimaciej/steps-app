import { Service } from "vue-typedi";
import { getSteps, provideStore } from "@/store";
import { shuffle, take } from "lodash";
import { Step } from "../../../../common/types/Step";

@Service()
export class FeedService {
  private readonly $store = provideStore();

  getStepsForFeed(count = 10): Step[] {
    return take(shuffle(getSteps(this.$store)), count);
  }
}
