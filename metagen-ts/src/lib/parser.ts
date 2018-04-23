import { Incident } from "incident";
import * as midl from "./midl";
import { Scanner, Token, TokenType } from "./scanner";

export function parseFile(url: string, content: string): midl.SourceFile {
  const scanner: Scanner = Scanner.fromText(content);
  const body: midl.ModItem[] = parseModItemList(scanner, TokenType.Eof);
  return midl.createSourceFile(url, body);
}

function parseModItemList(scanner: Scanner, endToken: TokenType): midl.ModItem[] {
  const items: midl.ModItem[] = [];
  parseTrivia(scanner, false, true);
  while (scanner.peek().type !== endToken) {
    items.push(parseModItem(scanner));
    parseTrivia(scanner, false, true);
  }
  return items;
}

function parseModItem(scanner: Scanner): midl.ModItem {
  const token = scanner.peek();
  switch (token.type) {
    case TokenType.BlockDoc: {
      scanner.advance();
      return midl.createDocItem(scanner.getString(token));
    }
    case TokenType.StructKw: {
      return parseStructDeclaration(scanner);
    }
    default:
      throw new Incident("UnexpectedToken");
  }
}

function parseStructDeclaration(scanner: Scanner): midl.StructDeclaration {
  parseExpected(scanner, TokenType.StructKw);
  parseTrivia(scanner, true, false);
  const name: midl.Identifier = parseIdentifier(scanner);
  parseTrivia(scanner, true, true);
  const body: midl.StructItem[] = parseStructBlock(scanner);
  return midl.createStructDeclaration(name, body);
}

function parseStructBlock(scanner: Scanner): midl.StructItem[] {
  const items: midl.StructItem[] = [];
  parseExpected(scanner, TokenType.LeftCurly);
  parseTrivia(scanner, false, true);
  while (scanner.peek().type !== TokenType.RightCurly) {
    items.push(parseStructItem(scanner));
    parseTrivia(scanner, false, true);
  }
  scanner.advance();
  return items;
}

function parseStructItem(scanner: Scanner): midl.StructItem {
  const token = scanner.peek();
  switch (token.type) {
    case TokenType.BlockDoc: {
      scanner.advance();
      return midl.createStructFieldDoc(scanner.getString(token));
    }
    case TokenType.Identifier: {
      return parseStructField(scanner);
    }
    default:
      throw new Incident("UnexpectedToken");
  }
}

function parseStructField(scanner: Scanner): midl.StructField {
  const name: midl.Identifier = parseIdentifier(scanner);
  parseTrivia(scanner, true, true);
  parseExpected(scanner, TokenType.Colon);
  parseTrivia(scanner, true, true);
  const type = parseTypeExpression(scanner);
  parseTrivia(scanner, true, true);
  parseExpected(scanner, TokenType.Semicolon);
  return midl.createStructField(name, type);
}

function parseTypeExpression(scanner: Scanner): midl.TypeExpression {
  return parseIdentifier(scanner);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function parseExpected(scanner: Scanner, expected: TokenType): void {
  const token: Token = scanner.peek();
  if (token.type !== expected) {
    throw new Incident("UnexpectedToken", {actualName: TokenType[token.type], expectedName: TokenType[expected]});
  }
  scanner.advance();
}

// WS + comments
function parseTrivia(scanner: Scanner, withDoc: boolean, optional: boolean): void {
  let foundTrivia: boolean = false;
  while (isTrivia(scanner.peek(), withDoc)) {
    foundTrivia = true;
    scanner.advance();
  }
  if (!optional && !foundTrivia) {
    throw new Error("Expected trivia (white space or comment)");
  }
}

function isTrivia({type: tokenType}: Token, withDoc: boolean) {
  return tokenType === TokenType.BlockComment
    || tokenType === TokenType.LineComment
    || tokenType === TokenType.Ws
    || (withDoc && tokenType === TokenType.BlockDoc);
}

function parseIdentifier(scanner: Scanner): midl.Identifier {
  const token: Token = scanner.peek();
  if (token.type !== TokenType.Identifier) {
    throw new Error("Expected Identifier");
  }
  scanner.advance();
  return midl.createIdentifier(scanner.getString(token));
}
