import chai from "chai";
import { readSample } from "./samples";
import * as midl from "../lib/midl";
import { parseFile } from "../lib/parser";

describe("Parser", function () {
  describe("parseFile", function () {
    it("should parse `point.midl", async function () {
      const sourceText = await readSample("point.midl");
      const actual = parseFile("point.midl", sourceText);
      const expected: midl.SourceFile = midl.createSourceFile("point.midl", [
        midl.createDocItem("/**\n * Describes a 2D point.\n */"),
        midl.createStructDeclaration("Point",[
          midl.createStructField("x", midl.createIdentifier("sint32")),
          midl.createStructField("y", midl.createIdentifier("sint32")),
        ]),
      ]);
      chai.assert.deepEqual(actual, expected);
    });
  });
});
