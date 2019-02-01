"use strict";

const primitiveSet = require("es5-ext/object/primitive-set")
  , ensureString = require("es5-ext/object/validate-stringifiable-value")
  , basename     = require("path").basename
  , resolve      = require("path").resolve
  , readdir      = require("fs2/readdir");

const readdirOptions = {
	depth: Infinity,
	type: { file: true },
	pattern: /\.js$/,
	ignoreRules: ["git"],
	dirFilter: (function () {
		const blackList = primitiveSet(
			"bin", "docs", "documentation", "examples", "lib", "node_modules", "test", "tests",
			"spec", "specs"
		);

		return function (path) {
			return !blackList[basename(path)];
		};
	}())
};

module.exports = function (path) {
	path = resolve(ensureString(path));
	return readdir(path, readdirOptions)(paths => paths.filter(filename => filename !== "test.index.js"));
};
