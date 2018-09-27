# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [1.3.0] - 2018-09-32

- add postalCode attribute to the details
- implement "nearby-search" with a dedicated function

## [1.2.0] - 2018-09-27

### Added

- append postalCode, administrativeAreaLevel1 and administrativeAreaLevel2 in `retrieve` results

## [1.1.0] - 2018-07-26

- **tsconfig**: add `lib` ES2017
- move declarations to their own file and export them
- use query-string to prepare URI's with the given parameters
- allow using multiple countries in parameter `components`
- allow customizing the type of results expected (`(cities)`, `(regions)`)
- create types (unions) for the result types and the place types
- wrap `request` into an utility function (and test it)
- fix/update unit tests

## [1.0.0] - 2018-03-13

### Added

- project structure
- `autocomplete` feature
- `retrieve` feature
- unit tests
