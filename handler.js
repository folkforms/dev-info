const fileConverter = require("./fileConverter");
const shelljs = require("shelljs");

const handler = (node, options) => {
  console.info(``);

  if(isLeaf(node) && options.task !== "list") {
    let props;
    if(node.file) {
      props = fileConverter(node.file);
    } else {
      props = { ...node };
    }
    if(options.task === "execute") {
      const r = shelljs.exec(props.executable);
      return r.code;
    } else if(options.task === "print") {
      console.info(props.description);
      if(props.executable) {
        console.info(``);
        console.info(`Executable: ${props.executable}`);
      }
    }
  } else {
    traverse(node, 0, 4);
  }

  console.info(``);
  return 0;
};

const isLeaf = node => {
  return node && node.leaf;
}

const traverse = (obj, indent, increment) => {
  for (let k in obj) {
    if (typeof obj[k] === "object") {
      console.log(`${getSpaces(indent)}${k}`);
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
