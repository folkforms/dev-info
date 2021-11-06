#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fileio = require("@folkforms/file-io");
const fixTilde = require("./fixTilde");
const handler = require("./handler");
const validateAliases = require("./validateAliases");
const devInfo = require("./devInfo");
const params = require("./params/params");
const shelljs = require("shelljs");

// Parse command-line args
program
  .option('-x, --execute', 'execute commands')
  .option('-n, --dry-run', 'show the command that would be run, without actually running anything. Implies -x.')
  .option('-p, --print', 'print descriptions (default)')
  .option('-l, --list', 'print tree even if target node contains a description')
  .option('-s, --search <search>', 'search descriptions for the given text')
  .option('-c, --config <path>', 'override config path')
  .option('--list-params', 'List all params')
  .addHelpText('after', "\nSee https://github.com/folkforms/dev-info for examples\n")
  .parse(process.argv);

// Load config file
const config = fileio.readJson(fixTilde(program.opts().config || "~/.dev.config.json"));

if(program.opts().listParams) {
  console.info(``);
  console.info(`Params:`);
  console.info(``);
  Object.keys(params).forEach(key => console.info(`    ${key}\t ${params[key].description}`));
  console.info(``);
  return 0;
}

// Combine command-line args and configuration
let task = config.defaultTask;
let taskData;
if(program.opts().execute) { task = "execute"; }
if(program.opts().dryRun) { task = "execute"; }
if(program.opts().print) { task = "print"; }
if(program.opts().list) { task = "list"; }
if(program.opts().search) { task = "search"; taskData = program.opts().search; }
const options = {
  task,
  taskData,
  dryRun: !!program.opts().dryRun
};

// Load data from the data source (likely ~/.dev.data.json specified in config)
const data = fileio.readJson(fixTilde(config.dataSource || "~/.dev.data.json"));

// Define search arguments (e.g. "frontend build")
const treeSearch = program.args;

// Validate aliases
validateAliases(data, shelljs);

// Call main method
return devInfo(data, treeSearch, handler, shelljs, options).code;
