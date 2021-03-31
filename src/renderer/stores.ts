import { writable } from "svelte/store";
import { History } from "./History";

export const path_history = new History("/sdcard/");
export const files = writable([] as IFile[]);

files.subscribe((v) => {
  return v.sort(
    (a, e) =>
      (e.type === "directory" ? 1 : 0) - (a.type === "directory" ? 1 : 0)
  );
});
