import { TokenizeService } from "./tokenize.service";
import { Container } from "vue-typedi";
import { range } from "lodash";

const service = Container.get(TokenizeService);

describe("#clean", () => {
  test("lowercases the text", () => {
    expect(service.clean("pOkEMoN")).toEqual("pokemon");
  });

  test("replaces multiple spaces with a single one", () => {
    expect(service.clean("test   test")).toEqual("test test");
  });

  test("trims the whitespace in the begging and end of text", () => {
    expect(service.clean("  test test ")).toEqual("test test");
  });

  test("replaces stop characters with spaces", () => {
    [
      ["test;test", "test test"],
      ["test,test", "test test"],
      ["test.test", "test test"],
      ["test!test", "test test"],
      ["test?test", "test test"],
      ["test (test)", "test test"]
    ].forEach(([stringToTest, result]) => {
      expect(service.clean(stringToTest)).toEqual(result);
    });
  });

  test(`removes short words (<=${TokenizeService.LENGTH_THRESHOLD} letters) from the text`, () => {
    expect(service.clean("Test on test, but test")).toEqual(
      "test test but test"
    );
  });

  test("returns correct output for real usecases", () => {
    expect(service.clean("Zatrzymanie ręką za stopę")).toEqual(
      "zatrzymanie ręką stopę"
    );
    expect(
      service.clean("Potrójny obrót z przeprowadzeniem partnerki za plecami")
    ).toEqual("potrójny obrót przeprowadzeniem partnerki plecami");
  });
});

describe("#getTokenChains", () => {
  function createTokenArray(length: number): string[] {
    return Array.from({ length }, (v, i) => String.fromCharCode(97 + i));
  }

  function numberOfChains(chainSize: number, tokens: string[]): number {
    return tokens.length - (chainSize - 1);
  }

  test("returns empty token chain for empty token list", () => {
    expect(service.getTokenChains(1, [])).toEqual([]);
    expect(service.getTokenChains(2, [])).toEqual([]);
    expect(service.getTokenChains(3, [])).toEqual([]);
  });

  test("returns correct number of chains", () => {
    const tokenList = createTokenArray(10);

    range(1, 10).forEach(chainSize => {
      expect(service.getTokenChains(chainSize, tokenList).length).toEqual(
        numberOfChains(chainSize, tokenList)
      );
    });
  });

  test("returns array token list for size 1", () => {
    const tokenList = createTokenArray(5);
    const result = ["a", "b", "c", "d", "e"];

    expect(service.getTokenChains(1, tokenList)).toEqual(result);
  });

  test("returns array token list for size 2", () => {
    const tokenList = createTokenArray(5);
    const result = ["a|b", "b|c", "c|d", "d|e"];

    expect(service.getTokenChains(2, tokenList)).toEqual(result);
  });

  test("returns array token list for size 3", () => {
    const tokenList = createTokenArray(5);
    const result = ["a|b|c", "b|c|d", "c|d|e"];

    expect(service.getTokenChains(3, tokenList)).toEqual(result);
  });

  test("returns array token list for size 4", () => {
    const tokenList = createTokenArray(5);
    const result = ["a|b|c|d", "b|c|d|e"];

    expect(service.getTokenChains(4, tokenList)).toEqual(result);
  });
});

describe("#tokenize", () => {
  test("returns correct list of token chains", () => {
    expect(
      service.tokenize("Wejście do odwrotnego trzymania; wyjście obrotem")
    ).toEqual([
      "wejście",
      "odwrotnego",
      "trzymania",
      "wyjście",
      "obrotem",
      "wejście|odwrotnego",
      "odwrotnego|trzymania",
      "trzymania|wyjście",
      "wyjście|obrotem",
      "wejście|odwrotnego|trzymania",
      "odwrotnego|trzymania|wyjście",
      "trzymania|wyjście|obrotem",
      "wejście|odwrotnego|trzymania|wyjście",
      "odwrotnego|trzymania|wyjście|obrotem"
    ]);

    expect(service.tokenize("Zatrzymanie ręką za stopę")).toEqual([
      "zatrzymanie",
      "ręką",
      "stopę",
      "zatrzymanie|ręką",
      "ręką|stopę",
      "zatrzymanie|ręką|stopę"
    ]);

    expect(
      service.tokenize("Potrójny obrót z przeprowadzeniem partnerki za plecami")
    ).toEqual([
      "potrójny",
      "obrót",
      "przeprowadzeniem",
      "partnerki",
      "plecami",
      "potrójny|obrót",
      "obrót|przeprowadzeniem",
      "przeprowadzeniem|partnerki",
      "partnerki|plecami",
      "potrójny|obrót|przeprowadzeniem",
      "obrót|przeprowadzeniem|partnerki",
      "przeprowadzeniem|partnerki|plecami",
      "potrójny|obrót|przeprowadzeniem|partnerki",
      "obrót|przeprowadzeniem|partnerki|plecami"
    ]);
  });
});
