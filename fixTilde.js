const untildify = require('untildify');

const fixTilde = path => {
  if(path.startsWith("~")) {
    path = untildify(path);
  }
  return path;
}

module.exports = fixTilde;
