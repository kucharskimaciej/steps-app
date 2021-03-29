import { Service } from "vue-typedi";

type TagMatcherDefinitionTuple = [string, string[]];
type Matchers = Record<string, RegExp>;

@Service()
export class SmartTags {
  static readonly MATCHERS: TagMatcherDefinitionTuple[] = [
    ["Saida damska", ["said[ay] damsk(a|iej)"]],
    ["Saida męska", ["said[ay] męsk(a|iej)"]],
    ["Shadow position", ["shadow position", "shadow"]],
    ["Tep", ["tep", "tep(y|ami|em)"]],
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
    ["Footwork", ["footwork(iem|u)?"]],
    ["Obrót", ["obrót", "obrot(u|em)"]],
    ["Clockwise", ["clockwise"]],
    ["Skorpion", ["skorpion(ie)?"]],
    ["Napasada", ["napasad(a|zie)"]],
    ["Cross", ["kross", "cross", "cros(sem|sie)"]],
    ["Za partnerką", ["pozycj(a|i|ą) z tyłu", "za partnerką", "z tyłu"]],
    [
      "Przed partnerką",
      ["pozycj(a|i|ą) z przodu", "z przodu", "przed partnerką"]
    ],
    ["Wypuszczenie", ["wypuszcze(ń|nie|niu|nia|niem)"]]
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
