"use strict";

var ensureString       = require("es5-ext/object/validate-stringifiable-value")
  , reEscape           = require("es5-ext/reg-exp/escape")
  , deferred           = require("deferred")
  , resolve            = require("path").resolve
  , sep                = require("path").sep
  , lstat              = require("fs2/lstat")
  , writeFile          = require("fs2/write-file")
  , resolveModulePaths = require("./resolve-module-paths")
  , testIndexName      = require("./lib/test-index-name");

var sepRe = new RegExp(reEscape(sep), "g");

var generateQueueItem = function (isTest, modulePath, isLast) {
	var queueItem = "\tfunction () { return { name: " + JSON.stringify(modulePath) + ", test: ";
	if (isTest) {
		queueItem += "require(" + JSON.stringify("./test/" + modulePath.replace(sepRe, "/")) + ")";
	} else {
		queueItem +=
			"tape(\"Should have test file\", " +
			"function (t) { t.fail(\"Tests missing\"); t.end(); })";
	}
	queueItem += " }; }";
	if (!isLast) queueItem += ",";
	return queueItem;
};

module.exports = function (path) {
	path = resolve(ensureString(path));
	return resolveModulePaths(path)(function (modulePaths) {
		var testPath = resolve(path, "test");
		var srcCode = [
			"// DO NOT EDIT: FILE GENERATED BY 'tape-index'", "", "\"use strict\";", "",
			"Error.stackTraceLimit = Infinity;", "", "var tape = require(\"tape\");", "",
			"var endCallback;", "", "var testQueue = ["
		];
		return deferred.map(modulePaths, function (modulePath, index) {
			return lstat(resolve(testPath, modulePath))(
				function (stats) { return stats.isFile(); },
				function (err) {
					if (err.code === "ENOENT") return false;
					throw err;
				}
			)(function (isTest) {
				srcCode.push(
					generateQueueItem(isTest, modulePath, index === modulePaths.length - 1)
				);
			});
		})(function () {
			srcCode.push(
				"];", "", "(function self() {", "\tvar data = testQueue.shift()();",
				"\tconsole.log(\"Testing: \" + data.name + \"\\n\");", "\t/* istanbul ignore if */",
				"\tif (!data.test || !data.test.plan) " +
					"throw new Error(\"Test not exported in \" + data.name);",
				"\tif (testQueue[0]) data.test.on(\"end\", self);", "\t/* istanbul ignore if */",
				"\telse if (endCallback) " +
					"data.test.on(\"end\", function () { setTimeout(endCallback); });",
				"}())", "", "/* istanbul ignore next */",
				"module.exports.registerEndCallback = " +
					"function (callback) { endCallback = callback; }",
				""
			);

			return writeFile(resolve(path, testIndexName + ".js"), srcCode.join("\n"));
		});
	});
};
