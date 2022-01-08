const fileio = require("@folkforms/file-io");
const fs = require("fs-extra");
const yaml = require("js-yaml");

const getFilenameForParsing = options => {
  if(options.debug) {
    console.debug(`DEBUG: options.deployFolder = '${options.deployFolder}'`);
  }
  let file1 = fileio.glob(`${options.deployFolder}/*.yaml`).sort((a, b) => a.length - b.length);
  let file2 = fileio.glob(`${options.deployFolder}/*All.yaml`);
  let file3 = fileio.glob(`${options.deployFolder}/*Api.yaml`);
  let r;
  if(file2.length === 1) {
    r = file2[0];
  } else if(file3.length === 1) {
    r = file3[0];
  } else if(file1.length > 0) {
    r = file1[0];
  } else {
    if(options.debug) {
      const errorMessage = `DEBUG: Error getting hubspot.deploy/*.yaml file `
        + `(file1=${JSON.stringify(file1)}, `
        + `file2=${JSON.stringify(file2)}, `
        + `file3=${JSON.stringify(file3)})`;
      console.debug(errorMessage);
    }
  }
  return r;
}

const getYaml = filename => {
  const yamlFile = fs.readFileSync(filename, "utf8");
  const yamlData = yaml.load(yamlFile);
  return yamlData;
}

const getAppName = options => {
  let file = getFilenameForParsing(options);
  if(!file) {
    return null;
  }
  file = file.substring(options.deployFolder.length + 1);
  if (file.endsWith("All.yaml") || file.endsWith("Api.yaml")) {
    file = file.substring(0, file.length - 8);
  } else if (file.endsWith("Meta.yaml")) {
    file = file.substring(0, file.length - 9);
  } else {
    file = file.substring(0, file.length - 5);
  }
  return file;
}

module.exports = { getFilenameForParsing, getYaml, getAppName };
