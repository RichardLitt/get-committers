'use strict'

const Octokat = require('octokat')
const octo = new Octokat({
  token: process.env.GITHUB_OGN_TOKEN
})
const Promise = require('bluebird')
const moment = require('moment')
const _ = require('lodash')
const depaginate = require('depaginate')

module.exports = function (opts) {
  return Promise.try(function () {
    return octo.orgs(opts.org).repos.fetch()
  }).map(function (repo) {
    return depaginate(function (opts) {
      return octo.repos(opts.org, opts.repo).branches.fetch({
        per_page: 100,
        page: opts.page
      })
    }, {
      org: opts.org,
      repo: repo.name
    })
  }).then(function (response) {
    return _.flatten(response)
  }).map(function (response) {
    var repo = response.commit.url.match('/ipfs/([a-z-]*)/commits/')[1]
    var since = opts.since
    return octo.repos(opts.org, repo).commits.fetch({
      sha: response.commit.sha,
      per_page: 100,
      since: since
    })
    // Currently not paginating responses. Probably should.
    // return depaginate(function (opts) {
    //     return octo.repos(opts.org, opts.repo).commits.fetch({
    //         since: opts.since,
    //         page: opts.page,
    //         per_page: 100,
    //         sha: opts.sha
    //     })
    //   }, {
    //     org: opts.org,
    //     repo: repo,
    //     sha: response.commit.sha,
    //     since: '2016-01-11T00:01:01Z'
    //   })
  }, {concurrency: 10}).then(function (response) {
    return _.flatten(response)
  }).map(function (commit) {
    var arr = []
    if (commit.author && commit.author.login) {
      arr.push(commit.author.login)
    }
    if (commit.committer && commit.committer.login) {
      arr.push(commit.author.login)
    }
    // Sometimes this can be null.
    // if (!commit.committer && !commit.author) {
    //   if (commit.commit.author.name) {
    //     arr.push(`${commit.commit.author.name}`)
    //   }
    //   if (commit.commit.committer.name && commit.commit.committer.name !== commit.commit.author.name) {
    //     arr.push(`${commit.commit.author.name}`)
    //   }
    // }
    return arr
  }).then(function (contributors) {
    return _.uniq(_.flatten(contributors))
  }).catch(function (err) {
    console.log('err', err)
  })
}
