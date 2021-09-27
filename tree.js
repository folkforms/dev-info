const find = (data, treeSearch) => {

  let node = data;
  while(treeSearch.length > 0) {
    const term = treeSearch.splice(0, 1);
    if(!node) {
      return null;
    }
    node = node[term];
  }
  return node;
}

module.exports = { find };
