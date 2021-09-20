const tree = require("./tree");

const dev = (data, treeSearch, handler, options) => {
  const treeSearchOriginal = treeSearch.join(" ");

  // Get the target node
  const node = tree.find(data, treeSearch);
  if(!node) {
    console.error(`Error: Could not find ${JSON.stringify(treeSearchOriginal)}`);
    // FIXME Print list as deep as we could find
    return { code: 1 };
  }

  // Run the command
  const code = handler(node, options);
  return { code };
}

module.exports = dev;
