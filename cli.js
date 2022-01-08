#!/usr/bin/env node

const { Command, Option } = require('commander');
const program = new Command();
const fileio = require("@folkforms/file-io");
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
  .option('-ss, --short-search <search>', 'search descriptions for the given text but print only the paths')
  .option('-d, --data <path>', 'override data path')
  .option('--list-params', 'list all params')
  .option('--no-sub-params', 'skip parameter substitution')
  .option('--app-name', 'print app name')
  .option('--debug', 'debug mode')
  .option('--deploy-folder <folder>', 'override deploy folder')
  .addHelpText('after', "\nSee https://github.com/folkforms/dev-info for examples\n")
  .parse(process.argv);

// Load data file
const data = fileio.readJson(program.opts().data || "~/.dev-info.json");

if(program.opts().listParams) {
  console.info(``);
  console.info(`Params:`);
  console.info(``);
  Object.keys(params).forEach(key => console.info(`    ${key}\t ${params[key].description}`));
  console.info(``);
  return 0;
}

if(program.opts().appName) {
  const appName = params["appName"].exec({ "deployFolder": program.opts().deployFolder || "hubspot.deploy" });
  console.info(``);
  console.info(`App name:`);
  console.info(``);
  console.info(appName);
  console.info(``);
  return 0;
}

// Combine command-line args and configuration
let task = data.config?.defaultTask || "print";
let taskData;
if(program.opts().execute) { task = "execute"; }
if(program.opts().dryRun) { task = "execute"; }
if(program.opts().print) { task = "print"; }
if(program.opts().list) { task = "list"; }
if(program.opts().search) { task = "search"; taskData = program.opts().search; }
if(program.opts().shortSearch) { task = "shortSearch"; taskData = program.opts().shortSearch; }

const options = {
  task,
  taskData,
  subParams: program.opts().subParams,
  dryRun: program.opts().dryRun,
  debug: program.opts().debug,
  deployFolder: program.opts().deployFolder,
};

// Define search arguments (e.g. "frontend build")
const treeSearch = program.args;

// Validate aliases
validateAliases(data, shelljs);

// Call main method
const code = devInfo(data, treeSearch, handler, shelljs, options).code;
process.exit(code);
