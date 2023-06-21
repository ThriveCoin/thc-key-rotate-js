'use strict'

const _ = require('lodash')

class RandKeyRotate {
  /**
   * @param {object} opts
   * @param {Array<any>} opts.keys
   */
  constructor (opts) {
    this.keys = opts.keys
  }

  val () {
    return _.sample(this.keys)
  }
}

module.exports = RandKeyRotate
