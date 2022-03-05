const fileConverter = require("./fileConverter");
const executableParams = require("./executableParams");
const params = require("./params/params");
const tree = require("./tree");

const handler = (node, nodeKey, shell, options, dataObj, treeSearch) => {
  const fullData = dataObj;
  const data = dataObj.data;
  const projectDomains = dataObj.projectDomains;
  const paramOverrides = dataObj.paramOverrides;

  shell.echo(``);
  if(isLeaf(node) && options.task !== "list") {
    let props;
    if(node._file) {
      props = fileConverter(node._file);
    } else {
      props = { ...node };
    }
    if(options.task === "execute") {
      if(props._executable) {
        const executable = executableParams(props._executable, shell, projectDomains, paramOverrides, true, options);
        if(!options.dryRun) {
          const r = shell.exec(executable);
          return r.code;
        } else {
          shell.echo(executable);
          return 0;
        }
      } else {
        shell.echo(`Error: Node '${nodeKey}' does not contain an executable`);
        shell.echo(``);
        return 1;
      }
    } else if(options.task === "print") {
      let printNode;
      if(props._duplicate) {
        printNode = data;
        const arr = props._duplicate.split(" ");
        while(arr.length > 0) {
          const shift = arr.shift();
          printNode = printNode[shift];
        }
      } else {
        printNode = props;
      }

      shell.echo(printNode._description);

      // Print project note, if any
      const appName = params["appName"].exec(options)
      if(fullData["projectNotes"] && fullData["projectNotes"][appName]) {
        let projectNote = tree.find(fullData["projectNotes"][appName], treeSearch);
        if(projectNote) {
          shell.echo(``);
          shell.echo(`Notes for ${appName}:`);
          shell.echo(projectNote._note);
        }
      }

      if(printNode._executable && !printNode._isFile) {
        shell.echo(``);
        shell.echo(`Executable: ${executableParams(props._executable, shell, projectDomains, paramOverrides, false, options)}`);
      }
    }
  } else {
    traverse(node, 0, 4, shell);
  }

  shell.echo(``);
  return 0;
};

const isLeaf = node => {
  return node && node._description || node._duplicate || node._file;
}

const traverse = (obj, indent, increment, shell) => {
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      shell.echo(`${getSpaces(indent)}${k}`);
      traverse(obj[k], indent + increment, increment, shell)
    } else {
      // Stop recursing
    }
  }
}

const getSpaces = indent => {
  let x = "";
  for(let i = 0; i < indent; i++) {
    x += " ";
  }
  return x;
}


module.exports = handler;
