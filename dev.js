const tree = require("./tree");

const dev = (data, treeSearch, handler, options) => {
  // Get the target node
  const node = tree.find(data, treeSearch);

  // Run the command
  const code = handler(node, options);
  return { code };
}

module.exports = dev;
