const RecursiveIterator = require("recursive-iterator");

const search = (data, searchTerm) => {

  const found = [];
  for(let { node, path } of new RecursiveIterator(data)) {
    if(node._description && node._description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
      let foundPath = path.join(" ");
      foundPath = foundPath.substring(foundPath.indexOf(" ") + 1);
      found.push({ path: foundPath, description: node._description });
    }
  }
  if(found.length > 0) {
    console.info(``);
    found.forEach(item => console.info(`${item.path}:\n\n${item.description}\n\n----\n`));
    return { code: 0 };
  } else {
    return { code: 1 };
  }
}

module.exports = search;
