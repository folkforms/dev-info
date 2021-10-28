const fileio = require("@folkforms/file-io");
const fs = require("fs-extra");
const yaml = require("js-yaml");

const getFilenameForParsing = () => {
  let file1 = fileio.glob("hubspot.deploy/*.yaml").sort((a, b) => a.length - b.length);
  let file2 = fileio.glob("hubspot.deploy/*All.yaml");
  let file3 = fileio.glob("hubspot.deploy/*Api.yaml");
  let r;
  if(file2.length === 1) {
    r = file2[0];
  } else if(file3.length === 1) {
    r = file3[0];
  } else if(file1.length > 0) {
    r = file1[0];
  } else {
    // FIXME if debug mode:
    // const errorMessage = `Error getting hubspot.deploy/*.yaml file `
    //   + `(file1=${JSON.stringify(file1)}, `
    //   + `file2=${JSON.stringify(file2)}, `
    //   + `file3=${JSON.stringify(file3)})`;
    // console.debug(errorMessage);
  }
  return r;
}

const getYaml = filename => {
  const yamlFile = fs.readFileSync(filename, "utf8");
  const yamlData = yaml.load(yamlFile);
  return yamlData;
}

module.exports = { getFilenameForParsing, getYaml };
