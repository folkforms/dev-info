const paramUtils = require("./paramUtils");

const staticRoute = {
  description: "Gets the staticRoutes.route value from the hubspot.deploy/*.yaml filename",
  exec: () => {
    const file = paramUtils.getFilenameForParsing();
    if(!file) {
      return "staticRoute";
    }
    const yaml = paramUtils.getYaml(file);
    const target = yaml["staticRoutes"] || yaml["staticRoutesV2"];

    if(!target || target.length === 0 || !target[0].route) {
      return "staticRoute";
    } else {
      const s = target[0].route;
      return s.startsWith("/") ? s.substring(1) : s;
    }
  }
}

module.exports = staticRoute;
