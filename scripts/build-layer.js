//@ts-check
const path = require("path");
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const AdmZip = require("adm-zip");

async function main() {
  console.log("started build");
  const PROJECT_ROOT_PATH = path.join(__dirname, "..");

  const SRC_DIR_PATH = path.join(PROJECT_ROOT_PATH, "src");
  const FUNCTIONS_DIR_PATH = path.join(SRC_DIR_PATH, "functions");
  const COMMON_DIR_PATH = path.join(SRC_DIR_PATH, "common");
  const NODE_MODULES_PATH = path.join(PROJECT_ROOT_PATH, "node_modules");

  for (let dir of [FUNCTIONS_DIR_PATH, COMMON_DIR_PATH, NODE_MODULES_PATH]) {
    if (!fs.existsSync(dir)) {
      throw new Error(`expected directory ${dir} not found`);
    }
  }

  const BUILD_DIR_PATH = path.join(PROJECT_ROOT_PATH, "build", "layers");

  if (!fs.existsSync(BUILD_DIR_PATH)) {
    fs.mkdirSync(BUILD_DIR_PATH);
  } else {
    console.log("cleaning layers dir...");
    fs.rmSync(BUILD_DIR_PATH, { recursive: true });
    fs.mkdirSync(BUILD_DIR_PATH);
  }

  const zip = new AdmZip();
  console.log("adding common...");
  await zip.addLocalFolderPromise(COMMON_DIR_PATH, {
    zipPath: "nodejs/common",
  });
  console.log("adding node_modules...");
  await zip.addLocalFolderPromise(NODE_MODULES_PATH, {
    zipPath: "nodejs/node_modules",
  });
  console.log("creating layer.zip...");
  zip.writeZip(path.join(BUILD_DIR_PATH, "layer.zip"));
}
main();
