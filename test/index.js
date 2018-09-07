"use strict";

var aFrom             = require("es5-ext/array/from")
  , includes          = require("es5-ext/string/#/contains")
  , Deferred          = require("deferred")
  , resolve           = require("path").resolve
  , unlink            = require("fs2/unlink")
  , requireUncached   = require("cjs-module/require-uncached")
  , tape              = require("tape")
  , generateTestIndex = require("../");

module.exports = tape("Generate index", function (t) {
	var playgroundPath = resolve(__dirname, "_playground");

	generateTestIndex(playgroundPath)(function () {
		var deferred = new Deferred(), buffer = "";

		var originalLog = console.log;
		console.log = function (ignored) { buffer += aFrom(arguments).join(" ") + "\n"; };
		requireUncached([require.resolve("tape")], function () {
			return require("./_playground/test.index").registerEndCallback;
		})(deferred.resolve);
		return deferred.promise(function () {
			console.log = originalLog;
			// var results = pgTest._results;
			t.equal(includes.call(buffer, "Error: Tests missing"), true);
			// t.equal(results.pass, 2);
			// t.equal(global.testALoaded, true);
			return unlink(resolve(playgroundPath, "test.index.js"));
		});
	}).done(t.end, t.end);
});
