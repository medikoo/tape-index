"use strict";

var resolve            = require("path").resolve
  , sep                = require("path").sep
  , tape               = require("tape")
  , resolveModulePaths = require("../resolve-module-paths");

module.exports = tape("Resolve Module Paths", function (t) {
	var playgroundPath = resolve(__dirname, "_playground");

	resolveModulePaths(playgroundPath).done(function (data) {
		t.deepEqual(
			data.sort(),
			[
				["a.js"].join(sep), ["dir", "c.js"].join(sep), ["dir", "sub-dir", "b.js"].join(sep)
			].sort()
		);
		t.end();
	}, t.end);
});
