import { app, BrowserWindow, clipboard } from "electron";
import path from "path";
import { StartWatcher } from "./watch-svelte";
import { electron } from "node:process";
import { writeFile } from "fs";
import "./icon";
import "./adb-commands";

StartWatcher("C:/Users/Rafael/Desktop/Code/adb-explorer/public");
function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    x: 2400,
    y: 100,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();
  // win.loadURL(`http://localhost:3000`);
  win.loadFile("./public/index.html");
}

app.whenReady().then(async () => {
  createWindow();
  // ls("/sdcard/").then((e) => {
  //   clipboard.writeText(JSON.stringify(e));
  // });
  // writeFile(
  //   "./out.png",
  //   (await app.getFileIcon("../../src")).toPNG(),
  //   console.log
  // );

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
