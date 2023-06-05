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

  const BUILD_DIR_PATH = path.join(PROJECT_ROOT_PATH, "build", "functions");

  if (!fs.existsSync(BUILD_DIR_PATH)) {
    fs.mkdirSync(BUILD_DIR_PATH);
  } else {
    console.log("cleaning build dir...");
    fs.rmSync(BUILD_DIR_PATH, { recursive: true });
    fs.mkdirSync(BUILD_DIR_PATH);
  }

  const dirs = fs.readdirSync(FUNCTIONS_DIR_PATH);
  for (const currFunctionDir of dirs) {
    console.log("processing " + currFunctionDir);
    const CURR_FUNCTION_DIR_PATH = path.join(
      FUNCTIONS_DIR_PATH,
      currFunctionDir
    );
    const fnZip = new AdmZip();
    await fnZip.addLocalFolderPromise(CURR_FUNCTION_DIR_PATH, {});
    fnZip.writeZip(path.join(BUILD_DIR_PATH, currFunctionDir + ".zip"));
  }
}
main();
