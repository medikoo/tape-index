#!/usr/bin/env node

"use strict";

require("essentials");

const { resolve }   = require("path")
    , unlink        = require("fs2/unlink")
    , testIndexName = require("../lib/test-index-name")
    , meta          = require("../package")
    , generateIndex = require("..")
    , argv          = require("minimist")(process.argv.slice(2))
    , targetPath    = argv._[0] ? resolve(argv._[0]) : process.cwd();

const usage = `tape-index v${ meta.version } - Generates tests index

Usage: tape-index [path] {OPTIONS}

Options:

    --version, -v  Display version
    --help,    -h  Show this message
    --clear,   -c  Remove generated tape.index.js file

`;

if (argv.h || argv.help) {
	process.stdout.write(usage);
	return;
}

if (argv.v || argv.version) {
	process.stdout.write(`${ meta.version }\n`);
	return;
}

if (argv.c || argv.clear) {
	unlink(resolve(targetPath, `${ testIndexName }.js`), { loose: true }).done();
	return;
}

generateIndex(targetPath);
