const fileConverter = require("./fileConverter");
const executableParams = require("./executableParams");

const handler = (node, nodeKey, shell, options, data) => {
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
        const executable = executableParams(props._executable, shell);
        const r = shell.exec(executable);
        return r.code;
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
      if(printNode._executable) {
        shell.echo(``);
        shell.echo(`Executable: ${executableParams(props._executable, shell, false)}`);
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
