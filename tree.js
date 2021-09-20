const find = (data, treeSearch) => {

  let node = data["data"]; // Should match the first data node
  while(treeSearch.length > 0) {
    const term = treeSearch.splice(0, 1);
    node = node[term];
  }
  return node;
}

module.exports = { find };
