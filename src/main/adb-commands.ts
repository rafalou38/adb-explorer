import { ipcMain } from "electron";
import { ExecException } from "child_process";
import { ls, shell } from "./adb";
import { basename } from "path";

ipcMain.handle("list-content", async (event, path: string) => {
  return await ls(path);
});

ipcMain.handle("get-link-data", async (event, path: string) => {
  let c = (await shell("readlink", [path])) as {
    err: ExecException | null;
    stdout: string;
    stderr: string;
  };
  let lastPath: string = "/";
  while (!c.err) {
    c = (await shell("readlink", [c.stdout.trim()])) as {
      err: ExecException | null;
      stdout: string;
      stderr: string;
    };
    if (c.err) {
      let found = (await ls(lastPath, true)).find(
        (e) => e.file_name == "."
      ) as IFile;

      found.file_name = basename(lastPath);
      return found;
    }
    lastPath = c.stdout.trim();
  }
  return ls(c.stdout.trim());
});
