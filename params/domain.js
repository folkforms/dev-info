const paramUtils = require("./paramUtils");

const server = {
  description: "Gets the server name based on the app name and the projectDomainsMap value in .dev-info.json",
  exec: (projectDomainMap = {}) => {
    const appName = paramUtils.getAppName();
    if(!appName) {
      return "local.hubteamqa.com";
    }

    let result;
    Object.keys(projectDomainMap).forEach(key => {
      const values = projectDomainMap[key];
      if(values.indexOf(appName) !== -1) {
        result = key;
      }
    });
    return result || "local.hubteamqa.com";
  }
}

module.exports = server;
