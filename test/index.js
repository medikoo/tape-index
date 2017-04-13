"use strict";

var Deferred          = require("deferred")
  , proxyquire        = require("proxyquire")
  , resolve           = require("path").resolve
  , unlink            = require("fs2/unlink")
  , tape              = require("tape")
  , generateTestIndex = require("../");

tape("Generate index", function (t) {
	var playgroundPath = resolve(__dirname, "_playground");

	generateTestIndex(playgroundPath)(function () {
		var pgTest = tape.createHarness(), deferred = new Deferred();

		pgTest.createStream().on("close", deferred.resolve);
		proxyquire("./_playground/test.index", { tape: pgTest });
		return deferred.promise(function () {
			var results = pgTest._results;

			t.equal(results.fail, 1);
			t.equal(results.pass, 2);
			t.equal(global.testALoaded, true);
			return unlink(resolve(playgroundPath, "test.index.js"));
		});
	}).done(t.end, t.end);
});
