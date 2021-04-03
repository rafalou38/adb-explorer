import { ExecException } from "node:child_process";
import { shell } from "./shell";

export async function ls(dir: string = "/", all = false) {
  console.log("ls of dir", dir);

  let { stdout } = (await shell("ls", [
    "-lc",
    all ? "-a" : "-A",
    `'${dir}'`,
    "2>/dev/null",
  ])) as {
    err: ExecException | null;
    stdout: string;
    stderr: string;
  };
  const lines = stdout.split("\r\n");
  const files: IFile[] = [];
  for (const line of lines) {
    let parsed = _parseLsLine(line);
    if (parsed) {
      files.push(parsed as IFile);
    }
  }
  return files;
}

function _parseLsLine(line: string): IFile | boolean {
  // see https://www.thegeekstuff.com/2009/07/linux-ls-command-examples/
  let [
    attrs,
    hard_links,
    owner,
    group,
    size,
    last_modification_date,
    last_modification_hour,
    ...file_name_raw
  ] = line.split(/\s+/);
  if (file_name_raw.length === 0) return false;

  let file_name = file_name_raw.join(" ");
  let type: "directory" | "file" | "link" | "unknown";
  let link_to: string | undefined;

  switch (attrs[0]) {
    case "d":
      type = "directory";
      break;
    case "l":
      type = "link";
      [file_name, link_to] = file_name.split(" -> ");
      break;
    case "-":
      type = "file";
      break;
    default:
      type = "unknown";
      break;
  }

  let file: IFile = {
    group,
    owner,
    size: parseInt(size),
    last_modification_date,
    last_modification_hour,
    hard_links: parseInt(hard_links),
    type,
    file_name,
    link_to,
  };
  return file;
}
