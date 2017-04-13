# tape-index
## Indexes all modules tests and reports (with tape) not tested modules

- Generates tests that confirm whether each JS module of a project is accompanied with a test file
- Generates one module that runs above test together with tests for all modules

### Installation

	$ npm install -g tape-index

### Usage

In project path:

	$ tape-index

Will create a `test.index.js` file, that when run will indicate with [fail](https://github.com/substack/tape#tfailmsg) missing test files and will invoke all existing modules tests.

### Tests

	$ npm test
