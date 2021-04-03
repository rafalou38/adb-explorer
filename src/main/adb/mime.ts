import fileType from "file-type";
import { shell } from "./shell";

export async function getMime(filePath: string) {
  const { stdout } = await shell("xxd", ["-p", "-l500", `'${filePath}'`]);
  const cleaned = stdout.replace(/[\s\n\r]+/g, "");
  const buffer = Buffer.from(cleaned, "hex");

  const result = await fileType.fromBuffer(buffer);
  console.log("found", result);

  return result?.mime || "text/plain";
}

// getMime("/storage/C013-6544/&python/kivy.py");
