# get-committers [![Build Status](https://travis-ci.org/RichardLitt/get-committers.svg?branch=master)](https://travis-ci.org/RichardLitt/get-committers)

[![Greenkeeper badge](https://badges.greenkeeper.io/RichardLitt/get-committers.svg)](https://greenkeeper.io/)

> Get users who have committed code to an organizations' GitHub repos

This module returns a list of GitHub usernames who have committed code to an organization's repos within a set timeframe.


## Install

```
$ npm install --save get-committers
```


## Usage

```js
const getCommitters = require('get-committers');

getCommitters({
    org: 'ipfs',
    since: '2016-01-15T00:20:24Z'
  });
//=> RichardLitt
```


## API

### getCommitters(options)

#### options.org

Type: `string`

The organization to scour for comments.

#### options.since

Type: `string`

The ISO date from which to get comments that have been made.

## CLI

```
$ npm install --global get-committers
```

```
$ get-committers --help

  Usage
    get-committers [org] [since]

  Examples
    $ get-committers ipfs 2016-01-15T00:20:24Z
    RichardLitt
```


## License

MIT © [Richard Littauer](http://burntfen.com)
