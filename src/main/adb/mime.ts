import { Magic, MAGIC_MIME_TYPE } from "mmmagic";
import { shell } from "./shell";
const magic = new Magic(MAGIC_MIME_TYPE);

export async function getMime(filePath: string) {
  const { stdout } = await shell("xxd", ["-p", "-l4", filePath]);
  const cleaned = stdout.replace(/[\s\n\r]+/g, "");
  return new Promise((resolve) => {
    magic.detect(Buffer.from(cleaned, "hex"), (error, result) => {
      resolve(result);
    });
  });
}
