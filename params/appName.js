const paramUtils = require("./paramUtils");

const appName = {
  description: "Gets the application name from the hubspot.deploy/*.yaml filename",
  exec: options => paramUtils.getAppName(options) || "appName"
}

module.exports = appName;
