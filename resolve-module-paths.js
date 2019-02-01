"use strict";

const ensureString               = require("es5-ext/object/validate-stringifiable-value")
    , { basename, resolve, sep } = require("path")
    , readdir                    = require("fs2/readdir");

const dirsBlackList = new Set([
	"bin", "docs", "documentation", "examples", "node_modules", "test", "tests", "spec", "specs"
]);

const readdirOptions = {
	depth: Infinity,
	type: { file: true },
	pattern: /\.js$/u,
	ignoreRules: ["git"],
	dirFilter: path => {
		if (dirsBlackList.has(basename(path))) return false;
		if (path.endsWith(`${ sep }lib${ sep }private`)) return false;
		return true;
	}
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
