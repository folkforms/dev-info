const paramUtils = require("./paramUtils");

const appName = {
  description: "Gets the application name from the hubspot.deploy/*.yaml filename",
  exec: () => paramUtils.getAppName() || "appName"
}

module.exports = appName;
