import { execSync } from "child_process";
const exec = (line) => console.log(execSync(line) + "");

exec(
  [
    "cd ../xterm.js/",
    "yarn package",
    "yarn pack",
    "cp ./xterm-*.tgz ../fluffy/patched/xterm",
  ].join(" && ")
);
exec(
  [
    "cd ../xterm.js/",
    "yarn package",
    "cd ./addons/addon-webgl",
    "yarn package",
    "yarn pack",
    "cp -R ./xterm-*.tgz ../../../fluffy/patched/xterm-addon-webgl",
  ].join(" && ")
);
exec(
  [
    "cd ../xterm.js/",
    "yarn package",
    "cd ./addons/addon-canvas",
    "yarn package",
    "yarn pack",
    "cp -R ./xterm-*.tgz ../../../fluffy/patched/xterm-addon-canvas",
  ].join(" && ")
);
