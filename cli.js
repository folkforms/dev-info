#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fileio = require("@folkforms/file-io");
const untildify = require('untildify');
const handler = require("./handler");
const dev = require("./dev");

const fixTilde = path => {
  if(path.startsWith("~")) {
    path = untildify(path);
  }
  return path;
}

// Parse command-line args
program
  .option('-x, --execute', 'FIXME Execute commands')
  .option('-p, --print', 'FIXME Print descriptions')
  .option('-c, --config <path>', 'Override config path')
  .parse(process.argv);

// Load config file
const config = fileio.readJson(fixTilde(program.opts().config || "~/.dev.config.json"));

// Combine command-line args and configuration
let task = config.defaultTask;
if(program.opts().execute) {
  task = "execute";
}
if(program.opts().print) {
  task = "print";
}
const options = {
  task,
};

// Load data from the data source (likely ~/.dev.data.json specified in config)
const data = fileio.readJson(fixTilde(config.dataSource || "~/.dev.data.json"));

// Define search arguments (e.g. "frontend build")
const treeSearch = program.args;

// Call main method
return dev(data, treeSearch, handler, options).code;
