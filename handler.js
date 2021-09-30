const fileConverter = require("./fileConverter");
const executableParams = require("./executableParams");
const shelljs = require("shelljs");

const handler = (node, nodeKey, options, data) => {
  console.info(``);

  if(isLeaf(node) && options.task !== "list") {
    let props;
    if(node.file) {
      props = fileConverter(node.file);
    } else {
      props = { ...node };
    }
    if(options.task === "execute") {
      if(props._executable) {
        const executable = executableParams(props._executable);
        const r = shelljs.exec(executable);
        return r.code;
      } else {
        console.info(`Error: Node '${nodeKey}' does not contain an executable`);
        console.info(``);
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

      console.info(printNode._description);
      if(printNode._executable) {
        console.info(``);
        console.info(`Executable: ${printNode._executable}`);
      }
    }
  } else {
    traverse(node, 0, 4);
  }

  console.info(``);
  return 0;
};

const isLeaf = node => {
  return node && node._description || node._duplicate;
}

const traverse = (obj, indent, increment) => {
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      console.info(`${getSpaces(indent)}${k}`);
      traverse(obj[k], indent + increment, increment)
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
