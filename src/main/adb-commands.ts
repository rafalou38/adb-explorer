import { ipcMain, app } from "electron";
import { ls } from "./adb";

ipcMain.handle("list-content", async (event, path: string) => {
  return await ls(path);
});
