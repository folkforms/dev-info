const paramUtils = require("./paramUtils");

const server = {
  description: "Gets the server name based on the app name and the projectDomains value in .dev-info.json",
  exec: (options, projectDomains = {}) => {
    const appName = paramUtils.getAppName(options);
    if(!appName) {
      return "local.hubteamqa.com";
    }

    let result;
    Object.keys(projectDomains).forEach(key => {
      const values = projectDomains[key];
      if(values.indexOf(appName) !== -1) {
        result = key;
      }
    });
    return result || "local.hubteamqa.com";
  }
}

module.exports = server;
