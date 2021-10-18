const tree = require("./tree");
const aliases = require("./aliases");
const search = require("./search");
const fuzzy = require("./fuzzy");

const copyArray = arr => {
  const copy = [];
  arr.forEach(item => copy.push(item));
  return copy;
}

const devInfo = (data, treeSearch, handler, options) => {
  const lastKey = treeSearch[treeSearch.length - 1];
  // Make a copy of treeSearch for error messages
  const treeSearchOriginal = copyArray(treeSearch);

  treeSearch = aliases(data.aliases, treeSearch);
  // Make a copy of aliased treeSearch for fuzzy searching
  const treeSearchOriginalForFuzzy = copyArray(treeSearch);

  if(options.task === "search") {
    const code = search(data, options.taskData);
    return { code };
  }

  // Get the target node
  let node = tree.find(data["data"], treeSearch);
  if(!node) {
    const fuzzyMatch = fuzzy(data["data"], treeSearchOriginalForFuzzy);
    if(fuzzyMatch.length === 1) {
      node = tree.find(data["data"], fuzzyMatch[0]);
    } else {
      if(fuzzyMatch.length > 1) {
        console.error(`Error: No exact match found, but found multiple fuzzy matches:`);
        console.error(``);
        fuzzyMatch.forEach(item => console.error(`    ${item.join(" ")}`));
        console.error(``);
        return { code: 1 };
      } else {
        console.error(`Error: Could not find ${JSON.stringify(treeSearchOriginal)}`);
        return { code: 1 };
      }
    }
  }

  // Run the command
  const code = handler(node, lastKey, options, data["data"]);
  return { code };
}

module.exports = devInfo;
