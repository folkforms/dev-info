const paramUtils = require("./paramUtils");

const appName = {
  description: "Gets the application name from the hubspot.deploy/*.yaml filename",
  exec: () => {
    let file = paramUtils.getFilenameForParsing();
    file = file.substring(15); // Remove "hubspot.deploy/"
    if (file.endsWith("All.yaml") || file.endsWith("Api.yaml")) {
      file = file.substring(0, file.length - 8);
    } else {
      file = file.substring(0, file.length - 5);
    }
    return file;
  }
}

module.exports = appName;
