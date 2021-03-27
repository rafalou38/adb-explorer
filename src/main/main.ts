import { app, BrowserWindow } from "electron";
import path from "path";
// Dans le processus principal
const { ipcMain } = require("electron");

ipcMain.handle("perform-action", (event, ...args) => {
  // ... actions réalisées au nom du Renderer
  console.log("action performed:", args);
});

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
  // win.setAlwaysOnTop(true, "normal");

  win.webContents.openDevTools();
  // win.loadURL(`http://localhost:3000`);
  win.loadFile("./public/index.html");
}

app.whenReady().then(() => {
  createWindow();

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
