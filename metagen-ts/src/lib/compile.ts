import * as ts from "typescript";
import { emitFile } from "./emit";
import * as midl from "./midl";

export function compile(midlRoot: midl.SourceFile): string {
  const resultFile = ts.createSourceFile("out.ts", "", ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });

  const statements = emitFile(midlRoot);

  return printer.printList(ts.ListFormat.MultiLine, ts.createNodeArray(statements), resultFile);
}
