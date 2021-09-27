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
  .option('-x, --execute', 'execute commands')
  .option('-p, --print', 'print descriptions (default)')
  .option('-l, --list', 'print tree even if target node contains a description')
  .option('-s, --search <search>', 'search descriptions for the given text')
  .option('-c, --config <path>', 'override config path')
  .parse(process.argv);

// Load config file
const config = fileio.readJson(fixTilde(program.opts().config || "~/.dev.config.json"));

// Combine command-line args and configuration
let task = config.defaultTask;
let taskData;
if(program.opts().execute) { task = "execute"; }
if(program.opts().print) { task = "print"; }
if(program.opts().list) { task = "list"; }
if(program.opts().search) { task = "search"; taskData = program.opts().search; }
const options = {
  task,
  taskData,
};

// Load data from the data source (likely ~/.dev.data.json specified in config)
const data = fileio.readJson(fixTilde(config.dataSource || "~/.dev.data.json"));

// Define search arguments (e.g. "frontend build")
const treeSearch = program.args;

// Call main method
return dev(data, treeSearch, handler, options).code;
