const fileio = require("@folkforms/file-io");

const getFilenameForParsing = () => {
  let file1 = fileio.glob("hubspot.deploy/*.yaml");
  let file2 = fileio.glob("hubspot.deploy/*All.yaml");
  let file3 = fileio.glob("hubspot.deploy/*Api.yaml");
  const found = file1.length === 1 || file2.length === 1 || file3.length === 1;
  if(!found) {
    throw new Error("Could not find hubspot.deploy/*.yaml file");
  }
  if(file1.length === 1) {
    return file1[0];
  } else if(file2.length === 1) {
    return file2[0];
  } else if(file3.length === 1) {
    return file3[0];
  } else {
    const errorMessage = `Error getting hubspot.deploy/*.yaml file `
      + `(file1=${JSON.stringify(file1)}, `
      + `file2=${JSON.stringify(file2)}, `
      + `file3=${JSON.stringify(file3)})`;
    throw new Error(errorMessage);
  }
}

module.exports = { getFilenameForParsing };
