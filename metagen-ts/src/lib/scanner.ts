export enum TokenType {
  BadCodepoint,

  Eof,
  Ws,
  BlockDoc,
  LineComment,
  BlockComment,

  Identifier,
  StructKw,
  SumKw,

  LeftCurly,
  RightCurly,
  LeftBracket,
  RightBracket,

  Colon,
  Semicolon,
}

export interface Token {
  readonly type: TokenType;
  readonly start: number;
  readonly end: number;
}

export interface Token {
  readonly type: TokenType;
  readonly start: number;
  readonly end: number;
}

export function* lexFile(content: string): Iterable<Token> {
  const scanner = Scanner.fromText(content);
  let token: Token;
  do {
    token = scanner.peek();
    yield token;
    scanner.advance();
  } while (token.type !== TokenType.Eof);
}

export class Scanner {
  readonly content: ReadonlyArray<number>;

  private index: number;
  private nextToken!: Token;

  constructor(content: number[]) {
    this.content = content;
    this.index = 0;
    this.scanNextToken();
  }

  public static fromText(text: string): Scanner {
    return new Scanner([...text].map(c => c.codePointAt(0)!));
  }

  advance(): void {
    this.index = this.nextToken.end;
    this.scanNextToken();
  }

  peek(): Token {
    return this.nextToken;
  }

  getString(token: Token): string {
    return String.fromCodePoint(...this.content.slice(token.start, token.end));
  }

  /**
   * Reads the token at the current index and places it in `.nextToken`.
   * Moves the current index.
   */
  private scanNextToken(): void {
    const start = this.index;
    const type = this.lex();
    const end = this.index;
    this.nextToken = {type, start, end};
  }

  /**
   * Precondition: `0 <= this.index && this.index <= this.content.length
   * @returns {TokenType}
   */
  private lex(): TokenType {
    if (this.index === this.content.length) {
      return TokenType.Eof;
    }
    const cp: number = this.content[this.index];
    if (chars.isWs(cp)) {
      return this.lexWsSkip1();
    } else if (chars.isIdStart(cp)) {
      return this.lexIdentifierOrKeywordSkip1();
    } else if (cp === chars.NUMBER_SIGN) {
      return this.lexLineCommentSkip1();
    }

    const simplePunctuator: TokenType | undefined = SIMPLE_PUNCTUATORS.get(cp);
    if (simplePunctuator !== undefined) {
      this.index++;
      return simplePunctuator;
    }

    const cp2: number | undefined = this.content[this.index + 1];
    if (cp === chars.SOLIDUS && cp2 === chars.ASTERISK) {
      return this.lexBlockCommentOrDocSkip2();
    }

    this.index++;
    return TokenType.BadCodepoint;
  }

  private lexWsSkip1(): TokenType.Ws {
    this.index++;
    while (this.index < this.content.length && chars.isWs(this.content[this.index])) {
      this.index++;
    }
    return TokenType.Ws;
  }

  private lexLineCommentSkip1(): TokenType.LineComment {
    this.index++;
    while (this.index < this.content.length) {
      this.index++;
      if (this.content[this.index - 1] === chars.LINE_FEED) {
        break;
      }
    }
    return TokenType.LineComment;
  }

  private lexBlockCommentOrDocSkip2(): TokenType.BlockComment | TokenType.BlockDoc {
    this.index += 2;

    const isDocComment = (this.content[this.index] /* as number? */) === chars.ASTERISK
      && (this.content[this.index + 1] /* as number? */) !== chars.SOLIDUS;

    let depth: number = 1;
    while (this.index < this.content.length && depth > 0) {
      if (this.content[this.index] === chars.ASTERISK) {
        this.index++;
        if ((this.content[this.index] /* as number? */) === chars.SOLIDUS) {
          this.index++;
          depth--;
        }
      } else if (this.content[this.index] === chars.SOLIDUS) {
        this.index++;
        if ((this.content[this.index] /* as number? */) === chars.ASTERISK) {
          this.index++;
          depth++;
        }
      } else {
        this.index++;
      }
    }

    return isDocComment ? TokenType.BlockDoc : TokenType.BlockComment;
  }

  private lexIdentifierOrKeywordSkip1(): TokenType {
    const start = this.index;
    this.index++;
    while (this.index < this.content.length && chars.isIdContinue(this.content[this.index])) {
      this.index++;
    }
    const value: string = String.fromCodePoint.apply(null, this.content.slice(start, this.index));
    const keywords: Map<string, TokenType> = new Map([
      ["struct", TokenType.StructKw],
      ["sum", TokenType.SumKw],
    ]);
    const kwType: TokenType | undefined = keywords.get(value);
    return kwType !== undefined ? kwType : TokenType.Identifier;
  }
}

namespace chars {
  export const ASTERISK: 0x2a = 0x2a;
  export const CARRIAGE_RETURN: 0x0d = 0x0d;
  export const CHARACTER_TABULATION: 0x09 = 0x09;
  export const SOLIDUS: 0x2f = 0x2f;
  export const LINE_FEED: 0x0a = 0x0a;
  export const NUMBER_SIGN: 0x23 = 0x23;
  export const SPACE: 0x20 = 0x20;
  export const UPPER_A: 0x41 = 0x41;
  export const UPPER_Z: 0x5a = 0x5a;
  export const LOWER_A: 0x61 = 0x61;
  export const LOWER_Z: 0x7a = 0x7a;
  export const DIGIT_0: 0x30 = 0x30;
  export const DIGIT_9: 0x39 = 0x39;
  export const UNDERSCORE: 0x5f = 0x5f;
  export const DOLLAR: 0x24 = 0x24;
  export const EURO: 0x20ac = 0x20ac;

  export const LEFT_CURLY = 0x7b;
  export const RIGHT_CURLY = 0x7d;
  export const COLON = 0x3a;
  export const SEMICOLON = 0x3b;

  export function isWs(cp: number): boolean {
    return cp === CHARACTER_TABULATION || cp === LINE_FEED || cp === CARRIAGE_RETURN || cp === SPACE;
  }

  export function isDigit(cp: number): boolean {
    return DIGIT_0 <= cp && cp <= DIGIT_9;
  }

  export function isIdContinue(cp: number): boolean {
    return isDigit(cp) || isIdStart(cp);
  }

  export function isIdStart(cp: number): boolean {
    return UPPER_A <= cp && cp <= UPPER_Z || LOWER_A <= cp && cp <= LOWER_Z || cp === UNDERSCORE || cp === DOLLAR;
  }
}

// Unambiguous single-character punctuators
const SIMPLE_PUNCTUATORS: Map<number, TokenType> = new Map([
  [chars.LEFT_CURLY, TokenType.LeftCurly],
  [chars.RIGHT_CURLY, TokenType.RightCurly],
  [chars.COLON, TokenType.Colon],
  [chars.SEMICOLON, TokenType.Semicolon],
]);
