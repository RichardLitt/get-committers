#!/usr/bin/env node
'use strict'

var meow = require('meow')
var getCommitters = require('./')
var Promise = require('bluebird')

var cli = meow([
  'Usage',
  '  $ get-committers [org] [since]',
  '',
  'Examples',
  '  $ get-committers ipfs 2016-01-15T00:20:24Z',
  '  RichardLitt'
])

Promise.try(function () {
  return getCommitters({
    org: cli.input[0],
    since: cli.input[1]
  })
}).map(function (response) {
  console.log(response)
})
