const paramUtils = require("./paramUtils");

const staticRoute = {
  description: "Gets the staticRoutes.route value from the hubspot.deploy/*.yaml filename",
  exec: () => {
    const file = paramUtils.getFilenameForParsing();
    if(!file) {
      return "staticRoute";
    }
    const yaml = paramUtils.getYaml(file);
    if(!yaml.staticRoutes || yaml.staticRoutes.length === 0 || !yaml.staticRoutes[0].route) {
      return "staticRoute";
    } else {
      return yaml.staticRoutes[0].route;
    }
  }
}

module.exports = staticRoute;
