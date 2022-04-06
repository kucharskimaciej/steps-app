import { Service } from "typedi";
import { range } from "lodash";

@Service()
export class TokenizeService {
  static readonly STOP_CHARACTERS: RegExp = /[\s\d.,:;?!()"'/]+/g;
  static readonly LENGTH_THRESHOLD: number = 2;
  static readonly TOKEN_SIZE_RANGE = range(1, 5); // 1-grams to 4-grams
  static readonly TOKEN_SEPARATOR = "|";

  clean(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace(TokenizeService.STOP_CHARACTERS, " ")
      .replace(
        new RegExp(
          `(?:${TokenizeService.STOP_CHARACTERS.source}|^).{1,${TokenizeService.LENGTH_THRESHOLD}}(?=${TokenizeService.STOP_CHARACTERS.source}|$)`,
          "g"
        ),
        " "
      )
      .replace(/\s+/g, " ")
      .trim();
  }

  tokensFromText(text: string): string[] {
    return this.clean(text).split(" ");
  }

  tokenize(text: string): string[] {
    const tokens = this.tokensFromText(text);

    return TokenizeService.TOKEN_SIZE_RANGE.reduce(
      ($, size) => [...$, ...this.getTokenChains(size, tokens)],
      [] as string[]
    );
  }

  getTokenChains(chainSize: number, tokens: string[]): string[] {
    return range(tokens.length)
      .map((startIndex) => tokens.slice(startIndex, startIndex + chainSize))
      .filter((chain) => chain.length === chainSize)
      .map((chain) => chain.join(TokenizeService.TOKEN_SEPARATOR));
  }
}
