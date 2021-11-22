const RecursiveIterator = require("recursive-iterator");
const fileio = require("@folkforms/file-io");
const fixTilde = require("./fixTilde");

const search = (data, searchTerm, shell) => {
  const found = [];
  for(let { node, path } of new RecursiveIterator(data)) {
    if(node._description && node._description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
      let foundPath = path.join(" ");
      foundPath = foundPath.substring(foundPath.indexOf(" ") + 1);
      found.push({ path: foundPath, description: node._description });
    }
    if(node._file) {
      const contents = fileio.readLinesAsString(fixTilde(node._file));
      if(contents.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
        let foundPath = path.join(" ");
        foundPath = foundPath.substring(foundPath.indexOf(" ") + 1);
        found.push({ path: foundPath, file: node._file, description: contents });
      }
    }
  }
  if(found.length > 0) {
    shell.echo(``);
    found.forEach(item => {
      if(!item.file) {
        shell.echo(`${item.path}:\n\n${item.description}\n\n----\n`);
      } else {
        shell.echo(`${item.path} (${item.file}):\n\n${item.description}\n\n----\n`);
      }
    });
    return { code: 0 };
  } else {
    shell.echo(`Error: Search text '${searchTerm}' not found.`);
    return { code: 1 };
  }
}

module.exports = search;
