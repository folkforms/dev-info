const paramUtils = require("./paramUtils");

const staticRoute = {
  description: "Gets the zkGroup value from the hubspot.deploy/*.yaml filename",
  exec: () => {
    const file = paramUtils.getFilenameForParsing();
    const yaml = paramUtils.getYaml(file);
    if(!yaml.zkGroup) {
      return "zkGroup";
    } else {
      return yaml.zkGroup;
    }
  }
}

module.exports = staticRoute;
