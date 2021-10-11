const paramUtils = require("./paramUtils");

const staticRoute = {
  description: "Gets the appRoot value from the hubspot.deploy/*.yaml filename",
  exec: () => {
    const file = paramUtils.getFilenameForParsing();
    const yaml = paramUtils.getYaml(file);
    if(!yaml.appRoot) {
      return "appRoot";
    } else {
      return yaml.appRoot;
    }
  }
}

module.exports = staticRoute;
