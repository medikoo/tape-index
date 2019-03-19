"use strict";

const ensureString                     = require("es5-ext/object/validate-stringifiable-value")
    , reEscape                         = require("es5-ext/reg-exp/escape")
    , { basename, resolve, sep, join } = require("path")
    , lstat                            = require("fs2/lstat")
    , readdir                          = require("fs2/readdir")
    , writeFile                        = require("fs2/write-file")
    , resolveModulePaths               = require("./resolve-module-paths")
    , testIndexName                    = require("./lib/test-index-name");

const { push } = Array.prototype, sepRe = new RegExp(reEscape(sep), "gu");

module.exports = async function (packagePath) {
	packagePath = resolve(ensureString(packagePath));
	const testsPath = resolve(packagePath, "test"), modulesTestsData = [], indexTestsData = [];
	const testMappings = await Promise.all(
		(await resolveModulePaths(packagePath)).map(async filename => {
			let testFilenames = null;
			const stats = await lstat(resolve(testsPath, filename), { loose: true });
			if (stats) {
				if (stats.isFile()) testFilenames = [filename];
			} else {
				const testDirname = filename.slice(0, -3);
				const testDirnameFilenames = await readdir(resolve(testsPath, testDirname), {
					depth: Infinity,
					type: { file: true },
					pattern: /\.js$/u,
					ignoreRules: ["git"],
					loose: true,
					dirFilter: subdirPath => basename(subdirPath).startsWith("_")
				});
				if (testDirnameFilenames && testDirnameFilenames.length) {
					testFilenames = testDirnameFilenames
						.filter(
							testDirnameFilename => !basename(testDirnameFilename).startsWith("_")
						)
						.map(testDirnameFilename => join(testDirname, testDirnameFilename));
				}
			}
			return { filename, testFilenames };
		})
	);
	for (const { filename, testFilenames } of testMappings) {
		if (testFilenames) {
			modulesTestsData.push(
				...testFilenames.map(
					testFilename =>
						`require(${
							JSON.stringify(`./test/${ testFilename.replace(sepRe, "/") }`)
						});`
				)
			);
			indexTestsData.push(
				`\tt.pass(${ JSON.stringify(`Tests found for '${ filename }'`) });`
			);
		} else {
			indexTestsData.push(
				`\tt.fail(${ JSON.stringify(`Tests missing for '${ filename }'`) });`
			);
		}
	}
	const srcCode = [
		"// DO NOT EDIT: FILE GENERATED BY 'tape-index'", "", "\"use strict\";", "",
		"require(\"essentials\");", ""
	];

	srcCode.push("var test = require(\"tape\");");

	srcCode.push("", "test(\"Modules coverage\", function (t) {");
	push.apply(srcCode, indexTestsData);
	srcCode.push("\tt.end();", "});");

	srcCode.push("", "// Actual tests");
	push.apply(srcCode, modulesTestsData);
	srcCode.push("");

	return writeFile(resolve(packagePath, `${ testIndexName }.js`), srcCode.join("\n"));
};
