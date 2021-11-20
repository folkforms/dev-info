const paramUtils = require("./paramUtils");

const server = {
  description: "Gets the server name based on the app name and a mapping in the .dev-info.json file",
  exec: (projectDomainMap = {}) => {
    let file = paramUtils.getFilenameForParsing();
    if(!file) {
      return "local.hubteamqa.com";
    }
    file = file.substring(15); // Remove "hubspot.deploy/"
    if (file.endsWith("All.yaml") || file.endsWith("Api.yaml")) {
      file = file.substring(0, file.length - 8);
    } else {
      file = file.substring(0, file.length - 5);
    }

    let result;
    Object.keys(projectDomainMap).forEach(key => {
      const values = projectDomainMap[key];
      if(values.indexOf(file) !== -1) {
        result = key;
      }
    });
    return result || "local.hubteamqa.com";
  }
}

module.exports = server;