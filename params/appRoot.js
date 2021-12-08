const paramUtils = require("./paramUtils");

const appRoot = {
  description: "Gets the appRoot value from the hubspot.deploy/*.yaml file",
  exec: options => {
    const file = paramUtils.getFilenameForParsing(options);
    if(!file) {
      return "appRoot";
    }
    const yaml = paramUtils.getYaml(file);
    if(!yaml.appRoot) {
      return "appRoot";
    } else {
      return yaml.appRoot;
    }
  }
}

module.exports = appRoot;
