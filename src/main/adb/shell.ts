import { exec, ExecException } from "child_process";

export async function shell(
  command: string,
  args?: string[]
): Promise<{ err: ExecException | null; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(`adb shell "${command} ${args?.join(" ")}"`, (err, stdout, stderr) =>
      resolve({ err, stdout, stderr })
    );
  });
}
