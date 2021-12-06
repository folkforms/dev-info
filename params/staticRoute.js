const paramUtils = require("./paramUtils");

const staticRoute = {
  description: "Gets the staticRoutes.route value from the hubspot.deploy/*.yaml filename",
  exec: options => {
    const file = paramUtils.getFilenameForParsing(options);
    if(!file) {
      return "staticRoute(error 1)";
    }
    const yaml = paramUtils.getYaml(file);
    if(yaml["staticRoutes"]) {
      return getStaticRoutes(yaml["staticRoutes"]);
    } else if(yaml["staticRoutesV2"]) {
      return getStaticRoutesV2(yaml["staticRoutesV2"]);
    } else {
      return "staticRoute(error 4)";
    }
  }
}

const getStaticRoutes = target => {
  for(let i = 0; i < target.length; i++) {
    if(target[i].destination === "html/index.html") {
      const s = target[i].route;
      return s.startsWith("/") ? s.substring(1) : s;
    }
  }
  return "staticRoute(error 2)";
}

const getStaticRoutesV2 = target => {
  for(let i = 0; i < target.routes.length; i++) {
    if(target.routes[i].dest === "html/index.html") {
      const s = target.routes[i].paths[0];
      return s.startsWith("/") ? s.substring(1) : s;
    }
  }
  return "staticRoute(error 3)";
}

module.exports = staticRoute;
