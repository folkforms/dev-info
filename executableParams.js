const params = require("./params/params");

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
  const func = params[param];
  if(!func) {
    console.warn(`Warning: Unknown param '${param}' in executable '${cmd}'`);
    return param;
  } else {
    return func();
  }
}

module.exports = executableParams;
