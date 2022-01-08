const appName = require("./appName");
const staticRoute = require("./staticRoute");
const zkGroup = require("./zkGroup");
const appRoot = require("./appRoot");
const domain = require("./domain");
const deployName = require("./deployName");

const params = {
  "appName": appName,
  "staticRoute": staticRoute,
  "zkGroup": zkGroup,
  "appRoot": appRoot,
  "domain": domain,
  "deployName": deployName,
}

module.exports = params;
