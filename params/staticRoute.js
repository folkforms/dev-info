const paramUtils = require("./paramUtils");

const staticRoute = {
  description: "Gets the staticRoutes.route value from the hubspot.deploy/*.yaml filename",
  exec: () => {
    const file = paramUtils.getFilenameForParsing();
    if(!file) {
      return "staticRoute(1)";
    }
    const yaml = paramUtils.getYaml(file);
    const target = yaml["staticRoutes"];

    if(!target || target.length === 0 || !target[0].route) {
      return "staticRoute(2)";
    } else {
      for(let i = 0; i < target.length; i++) {
        if(target[i].destination === "html/index.html") {
          const s = target[i].route;
          return s.startsWith("/") ? s.substring(1) : s;
        }
      }
      return "staticRoute(3)";
    }
  }
}

module.exports = staticRoute;
