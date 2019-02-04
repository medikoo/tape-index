"use strict";

const proxyquire        = require("proxyquire")
    , { resolve }       = require("path")
    , unlink            = require("fs2/unlink")
    , tape              = require("tape")
    , generateTestIndex = require("../");

tape("Generate index", async t => {
	const playgroundPath = resolve(__dirname, "_playground");

	await generateTestIndex(playgroundPath);
	const pgTest = tape.createHarness();
	await new Promise(resolve => {
		pgTest.createStream().on("close", resolve);
		proxyquire("./_playground/test.index", { tape: pgTest });
	});
	const results = pgTest._results;

	t.equal(results.fail, 1);
	t.equal(results.pass, 2);
	t.equal(global.testALoaded, true);
	await unlink(resolve(playgroundPath, "test.index.js"));

	t.end();
});
