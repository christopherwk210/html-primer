#! /usr/bin/env node
const argv        = require('minimist')(process.argv.slice(2));
const pkg         = require('../package.json');
const help        = require('./help-message');
const fs          = require('fs');
const path        = require('path');
const hb          = require('handlebars');
const beautify    = require('js-beautify').html;
const beautyOpts  = require('../static/jsbeautifyrc.json');
const chalk       = require('chalk');
let options       = {};

// Show help message
if (argv.h || argv['help']) {
  help(pkg.name, pkg.version, pkg.bin, pkg.htmlPrimerOptions);
  return;
}

// Assign options
options.fname = (argv.f || argv['fname']) || 'index.html';
options.comments = (argv.c || argv['comments']) || false;
options.manifest = (argv.q || argv['manifest']) || false;
options.icons = (argv.i || argv['icons']) || false;
options.twitter = (argv.t || argv['twitter']) || false;
options.openGraph = (argv.o || argv['open-graph']) || false;
options.mobile = (argv.m || argv['mobile']) || false;
options.jquery = (argv.j || argv['jquery']) || false;
options.normalize = (argv.n || argv['normalize']) || false;
options.google = (argv.g || argv['google']) || false;

// Tell the user about the long journey ahead
console.log(chalk`{yellow • Creating template ${options.fname}...}`);

// Read the template
fs.readFile(path.join(__dirname, '../static/template.html'), 'utf8', (err, data) => {
  if (err) throw err;

  // Parse and pretty up
  let parsedResult = hb.compile(data)(options);
  parsedResult = parsedResult.replace(/(\r\n|\n|\r)(\r\n|\n|\r)/gm, '');
  parsedResult = handleComments(parsedResult, options.comments);
  parsedResult = beautify(parsedResult, beautyOpts);
  parsedResult = parsedResult.replace('/* beautify ignore:start */', '');
  parsedResult = parsedResult.replace('/* beautify ignore:end */', '');
  writeFile(parsedResult);
});

/**
 * Writes to file in CWD.
 * @param {String} data HTML template
 */
function writeFile(data) {
  fs.writeFile(path.join(process.cwd(), options.fname), data, (err, data) => {
    if (err) throw err;

    // Inform the user that the their struggle to create
    // the perfect HTML5 boilerplate is finally over
    console.log(chalk`{green ✔ Done! Have a great day!}`);
  });
}

/**
 * Optionally removes or newlines html comments
 * @param {String} data HTML template
 * @param {boolean} keep Keep comments
 * @return {String}
 */
function handleComments(data, keep) {
  let replace = keep ? '\n\r$1$2$3' : '';
  return data.replace(/(<!--)(.*?)(-->)/g, replace);
}