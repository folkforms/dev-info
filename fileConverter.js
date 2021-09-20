const fileio = require("@folkforms/file-io");

const fileConverter = file => {
  const lines = fileio.readLines(file);
  const data = {};
  data.description = lines.join("\n");
  for(let i = 0; i < lines.length; i++) {
    if(lines[i].startsWith("## Executable")) {
      data.executable = lines[i+2];
      break;
    }
  }
  return data;
}

module.exports = fileConverter;
