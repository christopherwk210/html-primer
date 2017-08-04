# <center>html-primer</center>

<center>
  <img src="./assets/demo.gif" alt="html-primer easily creates HTML5 boilerplate files">

  A small CLI utility that quickly generates HTML5 boilerplates.
</center>

# Installation

Be sure to install globally so you can use html-primer from the command line in any directory:
```
$ npm install -g html-primer
```

# Usage

You can use `http-primer` or just `http`:
```
$ http-primer [options]
$ http [options]
```

# Options
`-f` or `--fname` Use custom filename (defaults to `index.html`)

`-c` or `--comments` Include comments in the template (defaults to `false`)

`-q` or `--manifest` Include application manifest tag (defaults to `false`)

`-i` or `--icons` Include favicon fields (defaults to `false`)

`-t` or `--twitter` Include Twitter Card metadata (defaults to `false`)

`-o` or `--open-graph` Include Open Graph metadata (defaults to `false`)

`-m` or `--mobile` Include mobile web app metadata (defaults to `false`)

`-j` or `--jquery` Include jQuery (defaults to `false`)

`-n` or `--normalize` Include Normalize.css (defaults to `false`)

`-g` or `--google` Include Google Analytics (defaults to `false`)

`-h` or `--help` Display help

# Examples

Generate an HTML5 boilerplate file with the filename `boilerplate.html`, and include comments and google analytics:
```
$ html --fname="boilerplate.html" -c -g
```

Generate an HTML5 boilerplate file with CDN links to jQuery and Normalize.css:
```
$ html -j -n
```

# Development
```
$ git clone https://github.com/christopherwk210/html-primer.git
$ cd html-primer
$ npm i
$ node ./lib/html-primer.js
```