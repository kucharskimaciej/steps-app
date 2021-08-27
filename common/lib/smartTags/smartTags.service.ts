import { Service, Inject } from "vue-typedi";
import { AppConfigToken } from "../../tokens";
import { AppConfig } from "../../config/types";

type Matchers = Record<string, RegExp>;

@Service()
export class SmartTags {
  private matchers!: Matchers;

  @Inject(AppConfigToken)
  set appConfig(config: AppConfig) {
    this.matchers = config.smartTagMatchers.reduce(
      ($, [tag, matcherStrings]) => {
        const cases = matcherStrings.map(ms => `(?:${ms})`).join("|");
        $[tag] = new RegExp(`(?:^|\\W+)(${cases})(?:\\W+|$)`, "i");
        return $;
      },
      {} as Matchers
    );
  }

  getSmartTags(text: string): string[] {
    return Object.entries(this.matchers)
      .filter(([, matcher]) => matcher.test(text))
      .map(([tag]) => tag)
      .sort();
  }
}
