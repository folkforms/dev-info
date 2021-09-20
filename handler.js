const shelljs = require("shelljs");

const handler = (node, options) => {
  console.info(``);

  if(node.leaf) {
    if(options.task === "execute") {
      const r = shelljs.exec(node.executable);
      return r.code;
    } else if(options.task === "print") {
      console.info(node.description);
      if(node.executable) {
        console.info(``);
        console.info(`Executable: ${node.executable}`);
        console.info(``);
        console.info(`(Note: You can run the executable directly by adding '-x' to the previous command.)`);
      }
    }
  } else {
    const children = Object.keys(node);
    children.forEach(child => console.info(child));
  }

  console.info(``);
  return 0;
};

module.exports = handler;
