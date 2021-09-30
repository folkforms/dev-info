const fileio = require("@folkforms/file-io");

const executableParams = cmd => {

  let indices = [];
  indices = hasParam(cmd)
  while(indices) {
    cmd = replaceParam(cmd, indices[0], indices[1]);
    indices = hasParam(cmd);
  }
  return cmd;
}

const hasParam = cmd => {
  const start = cmd.indexOf("${");
  const end = cmd.indexOf("}");
  if(start !== -1 && end !== -1) {
    return [start, end];
  }
  return null;
}

const replaceParam = (cmd, paramStart, paramEnd) => {
  const firstPart = cmd.substring(0, paramStart);
  const paramPart = cmd.substring(paramStart, paramEnd + 1);
  const replacement = getParamValue(paramPart, cmd);
  const lastPart = cmd.substring(paramEnd + 1);
  return firstPart + replacement + lastPart;
}

const getParamValue = (param, cmd) => {
  param = param.substring(2, param.length - 1);
  const func = funcs[param];
  if(!func) {
    throw new Error(`Unknown param '${param}' in executable '${cmd}'`);
  } else {
    return func();
  }
}

const funcs = {
  "hubspot.deploy/projectName.yaml": () => {
    let file1 = fileio.glob("hubspot.deploy/*.yaml");
    let file2 = fileio.glob("hubspot.deploy/All*.yaml");
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
}

module.exports = executableParams;
