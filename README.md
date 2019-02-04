[![*nix build status][nix-build-image]][nix-build-url]
[![Windows build status][win-build-image]][win-build-url]
[![Tests coverage][cov-image]][cov-url]
![Transpilation status][transpilation-image]
[![npm version][npm-image]][npm-url]

# tape-index

## Ensure all package modules are covered by tests

Traverses package modules tree and creates tests index (test run entry point) which loads all tests files and
ensures failures to be exposed for modules which do not seem to have corresponding test files

For example, for `foo.js` module, utility will expect either `test/foo.js` test file or `test/foo` folder with multiple test files.

### Installation

    $ npm install tape-index

### Usage

In project path:

    $ npx tape-index

Will create a `test.index.js` file, that when run will indicate with [fail](https://github.com/substack/tape#tfailmsg) missing test files and will invoke all existing modules tests.

It's a good practice to setup following npm scripts:

```json
{
	"test-prepare": "tape-index",
	"test-run": "node test.index.js",
	"test": "npm run test-prepare && npm run test-run"
}
```

### Tests

    $ npm test

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/tape-index/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/tape-index
[win-build-image]: https://ci.appveyor.com/api/projects/status/eexleid0akflmdcc?svg=true
[win-build-url]: https://ci.appveyor.com/project/medikoo/tape-index
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/tape-index.svg
[cov-url]: https://codecov.io/gh/medikoo/tape-index
[transpilation-image]: https://img.shields.io/badge/transpilation-free-brightgreen.svg
[npm-image]: https://img.shields.io/npm/v/tape-index.svg
[npm-url]: https://www.npmjs.com/package/tape-index
