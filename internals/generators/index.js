const path = require("path");
const { exec } = require("child_process");
const componentGenerator = require("./component/index.js");
const containerGenerator = require("./container/index.js");
const contextGenerator = require("./context/index.js");
const hookGenerator = require("./hook/index.js");

module.exports = plop => {
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("container", containerGenerator);
  plop.setGenerator("context", contextGenerator);
  plop.setGenerator("hook", hookGenerator);
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
  plop.setActionType("prettify", (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      "/../../src/",
      config.path,
      plop.getHelper("properCase")(answers.name),
      "**.js",
    )}`;
    exec(`npm run prettify -- "${folderPath}"`);

    return folderPath;
  });
};
