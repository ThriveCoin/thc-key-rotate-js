'use strict'

const _ = require('lodash')

const RandKeyRotate = require('./rand.key.rotate')

class RandLazyClientRotate extends RandKeyRotate {
  /**
   * @param {object} opts
   * @param {Array<any>} opts.keys
   * @param {Function} opts.loadFunc
   */
  constructor (opts) {
    super(opts)

    this.clients = []
    this.loadFunc = opts.loadFunc
  }

  val () {
    if (this.clients.length < this.keys.length) {
      const key = this.keys[this.clients.length]
      const client = this.loadFunc(key)
      this.clients.push(client)
      return client
    }

    return _.sample(this.clients)
  }
}

module.exports = RandLazyClientRotate
