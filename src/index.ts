import { exec } from "child_process";

function ls(dir: string = "/") {
  return new Promise((resolve, reject) => {
    exec(`adb shell "ls -Alc ${dir} 2>/dev/null"`, (_err, stdout, _stderr) => {
      const lines = stdout.split("\r\n");
      const files: IFile[] = [];
      for (const line of lines) {
        let parsed = _parseLsLine(line);
        if (parsed) {
          files.push(parsed as IFile);
        }
      }
      resolve(files);
    });
  });
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
  if (!file_name_raw) return false;

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

ls("/bin/").then(console.log);
