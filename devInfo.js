const tree = require("./tree");
const aliases = require("./aliases");
const search = require("./search");
const fuzzy = require("./fuzzy");

const copyArray = arr => {
  const copy = [];
  arr.forEach(item => copy.push(item));
  return copy;
}

const devInfo = (data, treeSearch, handler, shell, options) => {
  const defaultOptions = {
    "deployFolder": "hubspot.deploy"
  };
  options = { ...defaultOptions, ...options };

  const lastKey = treeSearch[treeSearch.length - 1];
  // Make a copy of treeSearch for error messages
  const treeSearchOriginal = copyArray(treeSearch);

  treeSearch = aliases(data.aliases, treeSearch);
  // Make a copy of aliased treeSearch for fuzzy searching
  const treeSearchOriginalForFuzzy = copyArray(treeSearch);

  if(options.task === "search") {
    return search(data, options.taskData, shell);
  }

  // Get the target node
  let node = tree.find(data["data"], treeSearch);
  if(!node) {
    const fuzzyMatch = fuzzy(data["data"], treeSearchOriginalForFuzzy);
    if(fuzzyMatch.length === 1) {
      node = tree.find(data["data"], fuzzyMatch[0]);
    } else {
      if(fuzzyMatch.length > 1) {
        shell.echo(`Error: No exact match found, but found multiple fuzzy matches:`);
        shell.echo(``);
        fuzzyMatch.forEach(item => shell.echo(`    ${item.join(" ")}`));
        shell.echo(``);
        return { code: 1 };
      } else {
        shell.echo(`Error: Could not find ${JSON.stringify(treeSearchOriginal)}`);
        return { code: 1 };
      }
    }
  }

  // Run the command
  const code = handler(node, lastKey, shell, options, data);
  return { code };
}

module.exports = devInfo;
