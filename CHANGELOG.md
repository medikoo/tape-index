# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.2.0](https://github.com/medikoo/tape-index/compare/v3.1.0...v3.2.0) (2021-10-06)

### Features

-   Ignore any `*.config.js` files ([32e6055](https://github.com/medikoo/tape-index/commit/32e6055f0480f025d57b287dfe2e06eec0ff13ef))
-   Ignore root `test.js` file ([8d1e75d](https://github.com/medikoo/tape-index/commit/8d1e75df3bb6e6220d5c64a48b7c99a9e48c0f7e))

# [3.1.0](https://github.com/medikoo/tape-index/compare/v3.0.1...v3.1.0) (2019-03-19)

### Features

-   ignore '\_' prefixed files in tests ([ae5c6c5](https://github.com/medikoo/tape-index/commit/ae5c6c5))

<a name="3.0.1"></a>

## [3.0.1](https://github.com/medikoo/tape-index/compare/v3.0.0...v3.0.1) (2019-02-04)

### Bug Fixes

-   fix dependency ([d7f79c8](https://github.com/medikoo/tape-index/commit/d7f79c8))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/medikoo/tape-index/compare/v2.0.0...v3.0.0) (2019-02-04)

### Chores

-   upgrade dependencies ([fe0c1aa](https://github.com/medikoo/tape-index/commit/fe0c1aa))

### Features

-   ensure .js extension on binary ([372cf31](https://github.com/medikoo/tape-index/commit/372cf31))
-   exclude js files starting with "." ([09557a8](https://github.com/medikoo/tape-index/commit/09557a8))
-   imply "essentials" require ([25c1478](https://github.com/medikoo/tape-index/commit/25c1478))
-   refactor into async/await ([a1b1c21](https://github.com/medikoo/tape-index/commit/a1b1c21))
-   rely on essentials ([ce5a830](https://github.com/medikoo/tape-index/commit/ce5a830))
-   support multiple test files for single module ([c2b24a6](https://github.com/medikoo/tape-index/commit/c2b24a6))
-   upgrade to ES2015 ([d24b8e4](https://github.com/medikoo/tape-index/commit/d24b8e4))
-   upgrade to ES2015 ([80e68e9](https://github.com/medikoo/tape-index/commit/80e68e9))

### BREAKING CHANGES

-   Direct name of binary file was renamed to have .js extension
-   Drop support for non ES2016+ enviroments

<a name="2.0.0"></a>

# [2.0.0](https://github.com/medikoo/tape-index/compare/v1.1.1...v2.0.0) (2018-03-30)

### Features

-   add 'lib' to ignored folders ([208b200](https://github.com/medikoo/tape-index/commit/208b200))

### BREAKING CHANGES

-   Modules in 'lib' folder are no longer picked
    (as treated "private" which should be tested only through public ends)

<a name="1.1.1"></a>

## [1.1.1](https://github.com/medikoo/tape-index/compare/v1.1.0...v1.1.1) (2017-09-05)

<a name="1.1.0"></a>

# [1.1.0](https://github.com/medikoo/tape-index/compare/v1.0.0...v1.1.0) (2017-05-09)

### Features

-   ensure long error stack traces ([58ab8e8](https://github.com/medikoo/tape-index/commit/58ab8e8))

<a name="1.0.0"></a>

# 1.0.0 (2017-04-13)
