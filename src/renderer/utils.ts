const { dirname, normalize } = require("path");

export function cleanPath(path) {
  path = normalize(path).replace(/[\\\/]+/g, "/");
  return path;
}
