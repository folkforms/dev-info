const fileio = require("@folkforms/file-io");

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
      lines.splice(i - 1, lines.length - i + 1);
      data._description = lines;
      break;
    }
  }
  return data;
}

module.exports = fileConverter;
