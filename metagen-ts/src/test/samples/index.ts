import fs from "fs";
import path from "path";
import meta from "./meta.js";

export async function readSample(relPath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(resolveSamplePath(relPath), {encoding: "UTF-8"}, (err: Error | null, content: string) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}

function resolveSamplePath(relPath: string): string {
  return path.resolve(meta.dirname, relPath);
}
