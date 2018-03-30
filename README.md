[![*nix build status][nix-build-image]][nix-build-url]
[![Windows build status][win-build-image]][win-build-url]
![Transpilation status][transpilation-image]
[![npm version][npm-image]][npm-url]

# tape-index

## Indexes all modules tests and reports (with tape) not tested modules

*   Generates tests that confirm whether each JS module of a project is accompanied with a test file
*   Generates one module that runs above test together with tests for all modules

### Installation

    $ npm install -g tape-index

### Usage

In project path:

    $ tape-index

Will create a `test.index.js` file, that when run will indicate with [fail](https://github.com/substack/tape#tfailmsg) missing test files and will invoke all existing modules tests.

### Tests

    $ npm test

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/tape-index/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/tape-index
[win-build-image]: https://ci.appveyor.com/api/projects/status/eexleid0akflmdcc?svg=true
[win-build-url]: https://ci.appveyor.com/project/medikoo/tape-index
[transpilation-image]: https://img.shields.io/badge/transpilation-free-brightgreen.svg
[npm-image]: https://img.shields.io/npm/v/tape-index.svg
[npm-url]: https://www.npmjs.com/package/tape-index
