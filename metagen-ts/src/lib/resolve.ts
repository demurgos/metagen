// import * as midl from "./midl";
// import { Tagged } from "ts-tagged";
//
// export enum SymbolNamespace {
//   Type,
//   Value,
// }
//
// export interface TypeSymbol {
//   name: string;
//   declaration: midl.EnumDeclaration | midl.StructDeclaration | midl.TypeAliasDeclaration;
// }
//
// export interface ValueSymbol {
//   name: string;
//   declaration: any;
// }
//
// export class SymbolTable {
//   resolveName(location: midl.Node, name: string, ns: SymbolNamespace.Type): TypeSymbol;
//   resolveName(location: midl.Node, name: string, ns: SymbolNamespace.Value): ValueSymbol;
//   resolveName(location: any, name: any, ns: any): any {
//     throw new Error("NotImplemented");
//   }
// }
//
// export enum TypeKind {
//   Alias,
//   Enum,
//   Struct,
//   Union,
//   Primitive,
// }
//
// export interface MgType {
//   kind: TypeKind;
//   node?: midl.Node;
//   name?: string;
//
//   /**
//    * Module containing the type definition:
//    * - Empty array represents a builtin
//    * - First entry is file, next are optional namespaces.
//    */
//   module: string[];
// }
//
// interface ResolvedTable {
//   getTypeSymbolsInScope(location: midl.Node): Iterable<TypeSymbol>;
//   getTypeSymbolByName(location: midl.Node, name: string): TypeSymbol;
// }
//
// export function resolveProgram(files: midl.SourceFile[]): ResolvedTable {
//   const ctx = new Program();
//   for (const {url, root} of files) {
//     const module = [url];
//     for (const statement of root.statements) {
//       switch (statement.kind) {
//         case midl.SyntaxKind.EnumDeclaration:
//           ctx.registerType(module, statement.name.text, TypeKind.Enum, statement);
//           break;
//         default:
//           throw new Error("Unexpected kind");
//       }
//     }
//   }
// }
//
// class Program {
//   typeRefCache: Map<midl.ReferenceTypeExpression, MgType>;
//   types: Map<PathHash, MgType>;
//
//   constructor() {
//     this.typeRefCache = new Map();
//     this.types = new Map();
//   }
//
//   registerType(module: string[], name: string, kind: TypeKind, node?: midl.Node) {
//     const type: MgType = {module, name, kind, node};
//     const path: string = hashPath([...module, name]);
//     if (this.types.has(path)) {
//       throw new Error(`Duplicate type: ${path}`);
//     }
//     this.types.set(path, type);
//   }
//
//   resolveType(reference: midl.ReferenceTypeExpression): MgType {
//
//   }
// }
//
// type PathHash = Tagged<string, "PathHash">;
//
// function hashPath(path: string[]): PathHash {
//   return JSON.stringify(path);
// }
