const params = require("./params/params");

let shell;

const executableParams = (cmd, shellObj) => {
  shell = shellObj;
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
  if(!params[param] || !params[param].exec) {
    shell.echo(`Warning: Unknown param '${param}' in executable '${cmd}'`);
    return param;
  } else {
    const exec = params[param].exec;
    return exec();
  }
}

module.exports = executableParams;
