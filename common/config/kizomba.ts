import { AppConfig } from "./types";

const kizombaConfig: AppConfig = {
  feelings: {
    semba: "Semba",
    kizomba: "Kizomba",
    tarraxa: "Tarraxa",
    fusion: "Kizomba fusion",
    urban: "Urban Kizz",
    doucer: "Doucer"
  },
  difficulties: {
    1: "Very easy",
    2: "Easy",
    3: "Intermediate",
    5: "Hard",
    8: "Very hard"
  },
  smartTagMatchers: [
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
    ["Położenie", ["położeni(a|u|e|em)"]],
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
    ["Pivot", ["pivot(em|u)?", "pivocie"]],
    ["Izolacja", ["izolacj(i|a|ami|ą)"]]
  ]
};

export default kizombaConfig;
