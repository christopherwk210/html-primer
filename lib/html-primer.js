#! /usr/bin/env node
const argv  = require('minimist')(process.argv.slice(2));
const pkg   = require('../package.json');
const help  = require('./help-message');

if (argv.h || argv['help']) {
  help(pkg.name, pkg.version, pkg.bin, pkg.htmlPrimerOptions);
  return;
}