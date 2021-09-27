const RecursiveIterator = require("recursive-iterator");
const tree = require("./tree");

const fuzzy = (data, treeSearch) => {
  let found = [];
  let highestScore = 0;

  for(let { node, path } of new RecursiveIterator(data)) {

    path = path.filter(item => !item.startsWith("_"));

    let score = 0;
    for(let i = 0; i < treeSearch.length; i++) {
      if(path.indexOf(treeSearch[i]) != -1) {
        score += 1;
      }
    }
    if(score > highestScore) {
      highestScore = score;
    }
    found.push({ score, path });
  }

  // If nothing matches return false
  if(highestScore === 0) {
    return [];
  }

  // Remove everything but the highest scoring items
  found = found.filter(item => item.score === highestScore);
  // Remove scores
  found = found.map(item => item.path);
  // Remove duplicates
  found = unique(found);

  return found;
}

const unique = arr => {
  const seen = [];
  const output = [];
  arr.forEach(item => {
    const indexString = item.join(" ");
    if(seen.indexOf(indexString) === -1) {
      output.push(item);
      seen.push(indexString);
    }
  });
  return output;
}

module.exports = fuzzy;
