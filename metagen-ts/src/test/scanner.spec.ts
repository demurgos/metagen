import chai from "chai";
import { lexFile, Token, TokenType } from "../lib/scanner";
import { readSample } from "./samples";

describe("Scanner", function () {
  describe("lexFile", function () {
    it("should lex `point.midl", async function () {
      const sourceText = await readSample("point.midl");
      const actual = [...lexFile(sourceText)];
      const expected: Token[] = [
        {type: TokenType.BlockDoc, start: 0, end: 32},
        {type: TokenType.Ws, start: 32, end: 33},
        {type: TokenType.StructKw, start: 33, end: 39},
        {type: TokenType.Ws, start: 39, end: 40},
        {type: TokenType.Identifier, start: 40, end: 45},
        {type: TokenType.Ws, start: 45, end: 46},
        {type: TokenType.LeftCurly, start: 46, end: 47},
        {type: TokenType.Ws, start: 47, end: 50},
        {type: TokenType.Identifier, start: 50, end: 51},
        {type: TokenType.Colon, start: 51, end: 52},
        {type: TokenType.Ws, start: 52, end: 53},
        {type: TokenType.Identifier, start: 53, end: 59},
        {type: TokenType.Semicolon, start: 59, end: 60},
        {type: TokenType.Ws, start: 60, end: 63},
        {type: TokenType.Identifier, start: 63, end: 64},
        {type: TokenType.Colon, start: 64, end: 65},
        {type: TokenType.Ws, start: 65, end: 66},
        {type: TokenType.Identifier, start: 66, end: 72},
        {type: TokenType.Semicolon, start: 72, end: 73},
        {type: TokenType.Ws, start: 73, end: 74},
        {type: TokenType.RightCurly, start: 74, end: 75},
        {type: TokenType.Ws, start: 75, end: 76},
        {type: TokenType.Eof, start: 76, end: 76},
      ];
      chai.assert.deepEqual(actual, expected);
    });
  });
});
