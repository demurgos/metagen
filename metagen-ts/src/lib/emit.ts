import * as ts from "typescript";
import * as midl from "./midl";
import {Incident} from "incident";

class ModImports {
  imports: ts.Identifier[];

  constructor() {
    this.imports = [];
  }

  resolveType(typeName: string): ts.TypeReferenceNode {
    return ts.createTypeReferenceNode(typeName, undefined);
  }
}

class Emitter {
  imports: ModImports;
  statements: ts.Statement[];

  constructor() {
    this.imports = new ModImports();
    this.statements = [];
  }

  apply(statements: midl.ModItem[]): void {
    for (const statement of statements) {
      this.emitStatement(statement);
    }
  }

  toStatementsList(): ts.Statement[] {
    return this.statements;
  }

  private emitStatement(item: midl.ModItem): void {
    switch (item.kind) {
      case midl.SyntaxKind.EnumDeclaration:
        this.emitEnumDeclaration(item);
        break;
      default:
        throw new Incident("UnexpectedStatementKind");
    }
  }

  private emitEnumDeclaration(enumDeclaration: midl.EnumDeclaration): void {
    const name: ts.Identifier = ts.createIdentifier(enumDeclaration.name.text);
    const modifiers: ReadonlyArray<ts.Modifier> = [ts.createToken(ts.SyntaxKind.ExportKeyword)];
    const members: ReadonlyArray<ts.EnumMember> = enumDeclaration.fields.map(field => this.emitEnumField(field));
    const declaration: ts.EnumDeclaration = ts.createEnumDeclaration(undefined, modifiers, name, members);
    if (enumDeclaration.doc !== undefined) {
      addDocComment(declaration, enumDeclaration.doc);
    }
    this.statements.push(declaration);
  }

  private emitEnumField(enumField: midl.EnumField): ts.EnumMember {
    const name: ts.Identifier = ts.createIdentifier(enumField.name.text);
    return ts.createEnumMember(name);
  }
}

function addDocComment(node: ts.Node, text: string): void {
  text = `*\n * ${text.replace(/\n/g, "\n * ")}\n `;
  ts.addSyntheticLeadingComment(node, ts.SyntaxKind.MultiLineCommentTrivia, text, true);
}

export function emitFile(root: midl.SourceFile): ts.Statement[] {
  const emitter = new Emitter();
  emitter.apply(root.body);
  return emitter.toStatementsList();
}

// interface EmitResult {
//   imports: ModImports;
//   statements: ts.Statement[];
// }
//
// export function emit(mod: MgMod): EmitResult {
//   const imports: ts.Identifier[] = [];
//
//   return ts.createModuleBlock([]);
// }
//
// export function emitDeclaration(mgDeclaration: MgDeclaration, imports: ModImports): EmitResult {
//   const name: ts.Identifier = ts.createIdentifier(mgDeclaration.name);
//   const type: ts.TypeReferenceNode = imports.resolveType("number");
//   const alias: ts.TypeAliasDeclaration = ts.createTypeAliasDeclaration(undefined, undefined, name, undefined, type);
//   return {imports, statements: [alias]};
// }
//
// emit({
//   statements: [{
//     name: "Point",
//     type: {
//       kind: SymbolKind.Primitive,
//       id: "Sint32",
//     },
//   }],
// });
