const paramUtils = require("./paramUtils");

const zkGroup = {
  description: "Gets the zkGroup value from the hubspot.deploy/*.yaml filename",
  exec: options => {
    const file = paramUtils.getFilenameForParsing(options);
    if(!file) {
      return "zkGroup";
    }
    const yaml = paramUtils.getYaml(file);
    if(!yaml.zkGroup) {
      return "zkGroup";
    } else {
      return yaml.zkGroup;
    }
  }
}

module.exports = zkGroup;
