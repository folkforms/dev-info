const fileConverter = require("./fileConverter");
const shelljs = require("shelljs");

const handler = (node, options) => {
  console.info(``);

  if(node.leaf) {
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
    const children = Object.keys(node);
    children.forEach(child => console.info(child));
  }

  console.info(``);
  return 0;
};

module.exports = handler;
