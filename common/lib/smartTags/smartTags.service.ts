import { Service } from "vue-typedi";

type TagMatcherDefinitionTuple = [string, string[]];
type Matchers = Record<string, RegExp>;

@Service()
export class SmartTags {
  static readonly MATCHERS: TagMatcherDefinitionTuple[] = [
    ["Saida damska", ["said(a|y|zie) damsk(a|iej)"]],
    ["Saida męska", ["said(a|y|zie) męsk(a|iej)"]],
    ["Saida francuska", ["francusk(a|ą|iej)"]],
    ["Shadow position", ["shadow position", "shadow"]],
    ["Tep", ["tep", "tep(y|ami|em)"]],
    ["Virgula", ["virgul[ai]"]],
    ["Monkey Virgula", ["monkey", "monkey virgul[ai]"]],
    ["Otwarcie", ["otwarci(e|a|u)"]],
    [
      "Przesunięcie nogi",
      ["przesunięci(e|u)", "przesunięcie nogi", "przesunięcie stopy"]
    ],
    ["Zatrzymanie", ["zatrzymani(u|e|em)"]],
    ["Grande-saida", ["grande(-|\\s)said(a|y|zie)"]],
    ["Podniesienie nogi", ["podniesieni(e|u|em)( nogi|stopy)?"]],
    [
      "Odwrotne trzymanie",
      ["odwrotnego trzymania", "odwrotnym trzymani(u|em)"]
    ],
    ["Położenie", ["położeni(u|e|em)"]],
    ["Podcięcie", ["podcięci(u|e|em)"]],
    ["Cassamento", ["cassamento"]],
    ["Footwork", ["footwork(iem|u)?"]],
    ["Obrót", ["obrót", "obrot(u|em|ami)", "obrocie"]],
    ["Clockwise", ["clockwise"]],
    ["Skorpion", ["skorpion(ie)?"]],
    ["Napasada", ["napasad(y|a|zie)"]],
    ["Cross", ["kross", "cross", "cros(sem|sie)"]],
    ["Za partnerką", ["pozycj(a|i|ą) z tyłu", "za partnerką", "z tyłu"]],
    [
      "Przed partnerką",
      ["pozycj(a|i|ą) z przodu", "z przodu", "przed partnerką"]
    ],
    ["Wypuszczenie", ["wypuszcze(ń|nie|niu|nia|niem)"]],
    ["Wyrzucenie ręki", ["wyrzucen(iem?|iu)"]],
    ["Slide", ["slid(u|e|em|zie)"]],
    ["Pivot", ["pivot(em|u)?", "pivocie"]]
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
