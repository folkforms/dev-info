const fileio = require("@folkforms/file-io");

/**
 * Converts a markdown file into a node with `_description` and (optionally) `executable` attributes.
 *
 * @param {string} file file path to load
 */
const fileConverter = file => {
  const lines = fileio.readLines(file);

  let data = {};
  if(file.endsWith(".md")) {
    data = convertFromMarkdown(lines);
  } else {
    data._description = lines;
  }

  data._description = trimTrailingEmptyLines(data._description);
  data._description = data._description.join("\n");
  return data;
}

const trimTrailingEmptyLines = lines => {
  while(lines.length > 0 && lines[lines.length - 1] == "\n" || lines[lines.length - 1].length == 0) {
    lines.splice(lines.length - 1, 1);
  }
  return lines;
}

const convertFromMarkdown = lines => {
  let data = {};
  data._description = lines;
  for(let i = 0; i < lines.length; i++) {
    if(lines[i].startsWith("## Executable")) {
      data._executable = lines[i+2];
      data._description = lines;
      break;
    }
  }
  for(let i = 0; i < lines.length; i++) {
    if(lines[i].startsWith("Executable: ")) {
      data._executable = lines[i].substring(12);
      data._description = lines;
      break;
    }
  }

  return data;
}

module.exports = fileConverter;
