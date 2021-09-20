const shelljs = require("shelljs");

const handler = (node, options) => {
  console.info("");

  if(node.leaf) {
    if(options.task === "execute") {
      const r = shelljs.exec(node.executable);
      return r.code;
    } else if(options.task === "print") {
      console.log(node.description);
      if(node.executable) {
        console.log("");
        console.log(`Executable: ${node.executable}`);
      }
    }
  } else {
    const children = Object.keys(node);
    children.forEach(child => console.info(child));
  }

  console.info("");
  return 0;
};

module.exports = handler;
