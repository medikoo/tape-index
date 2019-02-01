"use strict";

const primitiveSet               = require("es5-ext/object/primitive-set")
    , ensureString               = require("es5-ext/object/validate-stringifiable-value")
    , { basename, resolve, sep } = require("path")
    , readdir                    = require("fs2/readdir");

const readdirOptions = {
	depth: Infinity,
	type: { file: true },
	pattern: /\.js$/u,
	ignoreRules: ["git"],
	dirFilter: (function () {
		const blackList = primitiveSet(
			"bin", "docs", "documentation", "examples", "node_modules", "test", "tests", "spec",
			"specs"
		);

		return path => {
			if (blackList[basename(path)]) return false;
			if (path.endsWith(`${ sep }lib${ sep }private`)) return false;
			return true;
		};
	})()
};

module.exports = function (path) {
	path = resolve(ensureString(path));
	return readdir(path, readdirOptions)(paths =>
		paths.filter(filename => {
			if (filename === "test.index.js") return false;
			if (basename(filename).startsWith(".")) return false;
			return true;
		})
	);
};
