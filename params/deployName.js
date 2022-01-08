const fileio = require("@folkforms/file-io");

const deployName = {
  description: "Gets the deployment name from the hubspot.deploy/*.yaml files",
  exec: options => {
    const yamlFiles = fileio.glob(`${options.deployFolder}/*.yaml`).sort((a, b) => a.length - b.length);
    let x = [
      yamlFiles.filter(f => f.endsWith("All.yaml")),
      yamlFiles.filter(f => f.endsWith("Meta.yaml")),
      yamlFiles.filter(f => f.endsWith(".yaml")),
    ].flat();
    if(!x[0]) { return "deployName"; }
    const filename = x[0];
    return filename.substring(filename.lastIndexOf("/") + 1, filename.lastIndexOf("."));
  }
}

module.exports = deployName;
