const tree = require("./tree");
const aliases = require("./aliases");

const dev = (data, treeSearch, handler, options) => {
  const lastKey = treeSearch[treeSearch.length - 1];
  const treeSearchOriginal = treeSearch.join(" ");

  treeSearch = aliases(data.aliases, treeSearch);

  // Get the target node
  const node = tree.find(data, treeSearch);
  if(!node) {
    console.error(`Error: Could not find ${JSON.stringify(treeSearchOriginal)}`);
    // FIXME Print list as deep as we could find
    return { code: 1 };
  }

  // Run the command
  const code = handler(node, lastKey, options);
  return { code };
}

module.exports = dev;
