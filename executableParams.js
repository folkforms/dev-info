const params = require("./params/params");

let shell;
let printWarning;
let projectDomains;
let paramOverrides;
let options;

const executableParams = (cmd, shellObj, projectDomainsObj = {}, paramOverridesObj = {}, warn = true, optionsObj) => {
  if(!optionsObj.subParams) {
    return cmd;
  }

  shell = shellObj;
  projectDomains = projectDomainsObj;
  paramOverrides = paramOverridesObj;
  printWarning = warn;
  options = optionsObj;

  let indices = [];
  indices = hasParam(cmd);
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
    if(end < start) {
      throw new Error(`Error: end (${end}) < start (${start}) for cmd '${cmd}'`);
    }
    return [start, end];
  }
  return null;
}

const replaceParam = (cmd, paramStart, paramEnd) => {
  const firstPart = cmd.substring(0, paramStart);
  const paramPart = cmd.substring(paramStart, paramEnd + 1);
  let replacement = getParamValue(paramPart, cmd);

  // A 'local param' is a param within the substituted param, e.g. ${staticRoute} -> /foo/{id}
  indices = hasLocalParam(replacement);
  while(indices) {
    replacement = replaceLocalParam(replacement, indices[0], indices[1]);
    indices = hasLocalParam(replacement);
  }

  const lastPart = cmd.substring(paramEnd + 1);
  return firstPart + replacement + lastPart;
}

const getParamValue = (param, cmd) => {
  param = param.substring(2, param.length - 1);
  if(!params[param] || !params[param].exec) {
    if(printWarning) {
      shell.echo(`Warning: Unknown param '${param}' in executable '${cmd}'`);
    }
    return param;
  } else {
    const appName = params["appName"].exec(options);
    const exec = params[param].exec;
    const override = paramOverrides && paramOverrides[appName] && paramOverrides[appName][param];
    return override || exec(options, projectDomains);
  }
}

const hasLocalParam = cmd => {
  const start = cmd.indexOf("{");
  const end = cmd.indexOf("}");
  if(start !== -1 && end !== -1) {
    return [start, end];
  }
  return null;
}

const replaceLocalParam = (cmd, paramStart, paramEnd) => {
  const firstPart = cmd.substring(0, paramStart);
  const paramPart = cmd.substring(paramStart + 1, paramEnd);
  const replacement = `:${paramPart}`;
  const lastPart = cmd.substring(paramEnd + 1);
  return firstPart + replacement + lastPart;
}

module.exports = executableParams;
