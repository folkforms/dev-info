const RecursiveIterator = require("recursive-iterator");

const validateAliases = input => {
  const aliases = Object.keys(input.aliases);
  const data = input.data;

  aliases.forEach(alias => {
    let found = false;
    for(let { path } of new RecursiveIterator(data)) {
      if(path.indexOf(alias) !== -1) {
        found = true;
      }
    }
    if(!found) {
      console.warn(`Warning: Alias '${alias}' is listed but there are no nodes with that name`);
    }
  });
}

module.exports = validateAliases;
