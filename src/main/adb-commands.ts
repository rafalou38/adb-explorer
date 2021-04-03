import { ipcMain } from "electron";
import { ls, shell, getMime } from "./adb";
import { basename } from "path";

ipcMain.handle("list-content", async (event, path: string) => {
  return await ls(path);
});

ipcMain.handle("get-file-mime", async (event, path: string) => {
  console.log("getting file mime");

  const fileMime = await getMime(path);
  console.log("sending", fileMime);

  return fileMime;
});

ipcMain.handle("get-link-data", async (event, path: string) => {
  let c = await shell("readlink", [path]);
  let lastPath: string = "/";
  while (!c.err) {
    c = await shell("readlink", [c.stdout.trim()]);
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

ipcMain.handle("get-file-content-raw", async (event, path: string) => {
  let c = await shell("cat", [`'${path}'`]);
  return c.stdout;
});
