const fileio = require("@folkforms/file-io");

const hubspotDeployProjectNameYaml = () => {
  let file1 = fileio.glob("hubspot.deploy/*.yaml");
  let file2 = fileio.glob("hubspot.deploy/*All.yaml");
  const found = file1.length === 1 || file2.length === 1;
  if(!found) {
    throw new Error("Could not find hubspot.deploy/*.yaml file");
  }
  let file = file1.length === 1 ? file1[0] : file2[0];
  file = file.substring(15); // Remove "hubspot.deploy/"
  if(file.endsWith("All.yaml")) {
    file = file.substring(0, file.length - 8);
  } else {
    file = file.substring(0, file.length - 5);
  }
  return file;
}

module.exports = hubspotDeployProjectNameYaml;
