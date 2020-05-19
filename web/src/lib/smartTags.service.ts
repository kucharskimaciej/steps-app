import { Service } from "vue-typedi";

type TagMatcherDefinitionTuple = [string, string[]];
type Matchers = Record<string, RegExp>;

@Service()
export class SmartTags {
  static readonly MATCHERS: TagMatcherDefinitionTuple[] = [
    ["Saida damska", ["said[ay] damsk(a|iej)"]],
    ["Saida męska", ["said[ay] męsk(a|iej)"]],
    ["Shadow position", ["shadow position", "shadow"]],
    ["Tep", ["tep", "tepy"]],
    ["Virgula", ["virgul[ai]"]],
    ["Monkey Virgula", ["monkey virgul[ai]"]],
    ["Otwarcie", ["otwarci(e|a|u)"]],
    ["Przesunięcie nogi", ["przesunięcie nogi", "przesunięcie stopy"]],
    ["Zatrzymanie", ["zatrzymaniem?"]],
    ["Grande-saida", ["grande(-|\\s)said(a|y)"]],
    ["Podniesienie nogi", ["podniesienie nogi", "podniesienie stopy"]],
    ["Odwrotne trzymanie", ["odwrotnego trzymania", "odwrotnym trzymaniem"]],
    ["Położenie", ["położeniem"]],
    ["Podcięcie", ["podcięciem?"]],
    ["Cassamento", ["cassamento"]],
    ["Footwork", ["footwork(iem)?"]],
    ["Obrót", ["obrót", "obrot(u|em)"]],
    ["Clockwise", ["clockwise"]],
    ["Skorpion", ["skorpion"]],
    ["Napasada", ["napasad(a|zie)"]]
  ];

  private matchers: Matchers = SmartTags.MATCHERS.reduce(
    ($, [tag, matcherStrings]) => {
      const cases = matcherStrings.map(ms => `(?:${ms})`).join("|");
      $[tag] = new RegExp(`(?:^|\\W+)(${cases})(?:\\W+|$)`, "i");
      return $;
    },
    {} as Matchers
  );

  getSmartTags(text: string): string[] {
    return Object.entries(this.matchers)
      .filter(([, matcher]) => matcher.test(text))
      .map(([tag]) => tag)
      .sort();
  }
}