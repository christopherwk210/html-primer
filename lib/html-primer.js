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
options.googleid = typeof(options.google) === 'string' ? options.google : 'UA-XXXXX-X';

// Tell the user about the long journey ahead
console.log(chalk`{yellow • Creating template ${options.fname}...}`);

// Read the template
fs.readFile(path.join(__dirname, '../static/template.html'), 'utf8', (err, data) => {
  if (err) throw err;

  // Parse with handlebars
  let parsedResult = hb.compile(data)(options);

  // Replace excess newlines
  parsedResult = parsedResult.replace(/(\r\n|\n|\r)(\r\n|\n|\r)/gm, '');

  // Keep/newline comments
  parsedResult = handleComments(parsedResult, options.comments);

  // Pretty up
  parsedResult = beautify(parsedResult, beautyOpts);

  // Remove beautify indicators from google analytics section
  parsedResult = parsedResult.replace('/* beautify ignore:start */', '');
  parsedResult = parsedResult.replace('/* beautify ignore:end */', '');
  
  // Write the file
  writeFile(parsedResult);
});

/**
 * Writes to file in CWD.
 * @param {String} data HTML template
 */
function writeFile(data) {
  let filePath = path.join(process.cwd(), options.fname);

  // Check if the file already exists
  fs.exists(filePath, exists => {
    if (exists) {
      console.log(chalk`{red • File \`${filePath}\` already exists! Aborting...}`);
    } else {
      fs.writeFile(path.join(process.cwd(), options.fname), data, (err, data) => {
        if (err) throw err;

        // Inform the user that the their struggle to create
        // the perfect HTML5 boilerplate is finally over
        console.log(chalk`{green ✔ Done! Have a great day!}`);
      });
    }
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