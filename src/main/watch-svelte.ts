import chokidar from "chokidar";
import electron from "electron";

const delay_seconds = 0.3;

let timeout: NodeJS.Timeout;

function restartElectron() {
  electron.BrowserWindow.getAllWindows().forEach((win) => win.reload());
}
function handleChange() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(restartElectron, delay_seconds * 1000);
}

export function StartWatcher(path: string) {
  const watcher = chokidar.watch(path, {
    ignored: /[\/\\]\./,
    persistent: true,
  });
  watcher
    .on("add", handleChange)
    .on("addDir", handleChange)
    .on("change", handleChange)
    .on("unlink", handleChange)
    .on("unlinkDir", handleChange)
    .on("ready", handleChange);
}
