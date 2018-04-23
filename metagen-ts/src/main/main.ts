import { compile } from "../lib/compile";
import * as midl from "../lib/midl";
import { parseSourceFile } from "../lib/parser";
import { lexFile } from "../lib/scanner";

console.log(compile(midl.createSourceFile("main", [
  midl.createEnumDeclaration("Shape", [
    midl.createEnumField("Square"),
    midl.createEnumField("Circle"),
  ], {doc: "Represents a shape."}),
  midl.createEnumDeclaration("SyntaxKind", [
    midl.createEnumField("Enum"),
    midl.createEnumField("Function"),
  ]),
  // midl.createStructDeclaration("SyntaxKind", [
  //   midl.createStructField("x", midl.createIdentifier("number")),
  //   midl.createStructField("y", midl.createIdentifier("number")),
  // ]),
])));

const src: string = `
struct Point {
  x: true;
  y: true;
}
`;

console.log([...lexFile(src)]);

console.log(parseSourceFile("main", src));
