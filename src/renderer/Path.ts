const { dirname } = require("path");
import { files, path_history } from "./stores";
import { cleanPath } from "./utils";
const { ipcRenderer } = require("electron");

export function setPath(newPath: string) {
  path_history.change(cleanPath(newPath));
}

function handlePathChange(newPath: string) {
  ipcRenderer.invoke("list-content", newPath).then((v) => {
    files.set(v);
  });
}

export function cd(dir: string) {
  setPath(`${path_history.value}/${dir}/`);
}

export function upDir() {
  let newPath = path_history.value;
  newPath = dirname(newPath);
  newPath = cleanPath(newPath);
  setPath(newPath);
}

path_history.subscribe(handlePathChange, () => {});

handlePathChange(path_history.value);
