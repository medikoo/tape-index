"use strict";

const resolve            = require("path").resolve
    , sep                = require("path").sep
    , tape               = require("tape")
    , resolveModulePaths = require("../resolve-module-paths");

tape("Resolve Module Paths", t => {
	const playgroundPath = resolve(__dirname, "_playground");

	resolveModulePaths(playgroundPath).done(data => {
		t.deepEqual(
			data.sort(),
			[
				["a.js"].join(sep), ["dir", "c.js"].join(sep),
				["dir", "sub-dir", "b.js"].join(sep)
			].sort()
		);
		t.end();
	}, t.end);
});
