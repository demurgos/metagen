export enum SyntaxKind {
  AttributeItem,
  CallParameter,
  CallTypeExpression,
  DocItem,
  StructFieldDoc,
  EnumDeclaration,
  EnumField,
  EnumTypeExpression,
  Identifier,
  QualifiedName,
  ReferenceTypeExpression,
  StructField,
  SourceFile,
  StructDeclaration,
  TypeAliasDeclaration,
  UseDeclaration,
}

/**
 * Base interface for MIDL syntax nodes.
 */
export interface Node {
  loc?: Location;
}

/**
 * Node location
 */
export interface Location {
  /**
   * File path
   */
  file: string;

  /**
   * Start offset.
   */
  start: number;

  /**
   * End offset.
   */
  end: number;
}

/**
 * Represents an identifier (a type name for example).
 */
export interface Identifier extends Node {
  kind: SyntaxKind.Identifier;
  text: string;
}

export function createIdentifier(text: string, loc?: Location): Identifier {
  return {
    kind: SyntaxKind.Identifier,
    text,
    loc,
  };
}

export function asIdentifier(text: string | Identifier): Identifier {
  return typeof text === "string" ? createIdentifier(text) : text;
}

/**
 * Represents a multipart identifier.
 */
export interface QualifiedName extends Node {
  kind: SyntaxKind.QualifiedName;
  segments: Identifier[];
}

export function createQualifiedName(segments: (string | Identifier)[], loc?: Location): QualifiedName {
  return {
    kind: SyntaxKind.QualifiedName,
    segments: segments.map(asIdentifier),
  };
}

/**
 * Root node of the AST
 */
export interface SourceFile {
  kind: SyntaxKind.SourceFile;
  url: string;
  body: ModItem[];
}

export function createSourceFile(url: string, body: ModItem[]): SourceFile {
  return {
    kind: SyntaxKind.SourceFile,
    url,
    body,
  };
}

export type ModItem =
  DocItem
  | AttributeItem
  | EnumDeclaration
  | StructDeclaration
  | TypeAliasDeclaration
  | UseDeclaration;

export interface DocItem extends Node {
  kind: SyntaxKind.DocItem;
  text: string;
}

export function createDocItem(text: string): DocItem {
  return {
    kind: SyntaxKind.DocItem,
    text,
  };
}

export interface AttributeItem extends Node {
  kind: SyntaxKind.AttributeItem;
  expression: Identifier;
}

export function createAttributeItem(expression: Identifier): AttributeItem {
  return {
    kind: SyntaxKind.AttributeItem,
    expression,
  };
}

export interface UseDeclaration extends Node {
  kind: SyntaxKind.UseDeclaration;
  specifier: string;
  name: Identifier;
}

export interface TypeAliasDeclaration extends Node {
  kind: SyntaxKind.TypeAliasDeclaration;
  name: Identifier;
  type: TypeExpression;
}

export type TypeExpression = CallTypeExpression | EnumTypeExpression | Identifier;

export interface CallTypeExpression extends Node {
  kind: SyntaxKind.CallTypeExpression;
  params: CallParameter[];
}

export interface CallParameter extends Node {
  kind: SyntaxKind.CallParameter;
  name?: Identifier;
  type: TypeExpression;
}

export function createCallParameter(
  name: string | Identifier | undefined,
  type: TypeExpression,
  loc?: Location,
): CallParameter {
  return {
    kind: SyntaxKind.CallParameter,
    name: name === undefined ? undefined : asIdentifier(name),
    type,
    loc,
  };
}

export interface ReferenceTypeExpression extends Node {
  kind: SyntaxKind.ReferenceTypeExpression;
  name: QualifiedName;
  genericArgs: any[];
}

export function createReferenceTypeExpression(name: string | QualifiedName, loc?: Location): ReferenceTypeExpression {
  return {
    kind: SyntaxKind.ReferenceTypeExpression,
    name: typeof name === "string" ? createQualifiedName([name]) : name,
    genericArgs: [],
    loc,
  };
}

export interface EnumDeclaration extends Node {
  kind: SyntaxKind.EnumDeclaration;
  name: Identifier;
  fields: EnumField[];
  doc?: string;
}

export function createEnumDeclaration(
  name: string | Identifier,
  fields: EnumField[],
  options?: { doc?: string },
  loc?: Location,
): EnumDeclaration {
  return {
    kind: SyntaxKind.EnumDeclaration,
    name: asIdentifier(name),
    fields,
    doc: options !== undefined && typeof options.doc === "string" ? options.doc : undefined,
    loc,
  };
}

export interface EnumTypeExpression extends Node {
  kind: SyntaxKind.EnumTypeExpression;
  name?: Identifier;
  fields: EnumField[];
}

export function createEnumTypeExpression(
  name: string | Identifier | undefined,
  fields: EnumField[],
  loc?: Location,
): EnumTypeExpression {
  return {
    kind: SyntaxKind.EnumTypeExpression,
    name: name === undefined ? undefined : asIdentifier(name),
    fields,
    loc,
  };
}

export interface EnumField extends Node {
  kind: SyntaxKind.EnumField;
  name: Identifier;
}

export function createEnumField(name: string | Identifier, loc?: Location): EnumField {
  return {
    kind: SyntaxKind.EnumField,
    name: asIdentifier(name),
    loc,
  };
}

export interface StructDeclaration extends Node {
  kind: SyntaxKind.StructDeclaration;
  name: Identifier;
  body: StructItem[];
}

export function createStructDeclaration(
  name: string | Identifier,
  body: StructItem[],
  loc?: Location,
): StructDeclaration {
  return {
    kind: SyntaxKind.StructDeclaration,
    name: asIdentifier(name),
    body,
    loc,
  };
}

export type StructItem = StructField | StructFieldDoc;

export interface StructFieldDoc extends Node {
  kind: SyntaxKind.StructFieldDoc;
  text: string;
}

export function createStructFieldDoc(text: string): StructFieldDoc {
  return {kind: SyntaxKind.StructFieldDoc, text};
}

export interface StructField extends Node {
  kind: SyntaxKind.StructField;
  name: Identifier;
  type: TypeExpression;
}

export function createStructField(name: string | Identifier, type: TypeExpression, loc?: Location): StructField {
  return {kind: SyntaxKind.StructField, name: asIdentifier(name), type, loc};
}
