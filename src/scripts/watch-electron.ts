import chokidar from "chokidar";
import { spawn } from "child_process";
import { ChildProcessByStdio } from "node:child_process";
import { Readable, Writable } from "node:stream";
import electron from "electron";

const delay_seconds = 0.3;

let timeout: NodeJS.Timeout;
let running_process: ChildProcessByStdio<
  null | Writable,
  null | Readable,
  null | Readable
>;

function start_cmd() {
  const p = spawn(electron as any, ["."], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
  return p;
}

function restartElectron() {
  if (!running_process || running_process.killed) {
    console.log("⚡ started electron  ⚛");
    running_process = start_cmd();
  } else {
    console.log("♻ restarting electron ⚛");
    running_process.kill("SIGINT");
    running_process = start_cmd();
  }
}
function handleChange() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(restartElectron, delay_seconds * 1000);
}

function StartWatcher(path: string) {
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
  console.log(`watching for changes in "${path}" 🔎`);
}

StartWatcher(process.argv[2] || "./build/");
