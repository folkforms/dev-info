const tree = require("./tree");

const aliases = (aliasList, treeSearch) => {
  if(!aliasList) {
    return treeSearch;
  }

  const keys = Object.keys(aliasList);
  treeSearch = treeSearch.map(item => {
    for(let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if(aliasList[key].indexOf(item) !== -1) {
        return key;
      }
    }
    return item;
  });
  return treeSearch;
}

module.exports = aliases;
