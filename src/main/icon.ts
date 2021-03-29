import { ipcMain, app } from "electron";
import { writeFile } from "fs/promises";

let lockupTable: {
  [key: string]: string;
} = {};

ipcMain.handle("get-icon", async (event, fileName: string) => {
  const extension = fileName.split(".")[fileName.split(".").length - 1];
  if (lockupTable[extension]) {
    return lockupTable[extension];
  }
  let image = await app.getFileIcon(fileName, { size: "large" });

  // writeFile("out.png", image.toPNG({ scaleFactor: 100 }));
  lockupTable[extension] = image.toDataURL({ scaleFactor: 10 });

  return lockupTable[extension];
  // ... actions réalisées au nom du Renderer
});
