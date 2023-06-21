'use strict'

class SeqKeyRotate {
  /**
   * @param {object} opts
   * @param {Array<any>} opts.keys
   * @param {number} [opts.start]
   */
  constructor (opts) {
    this.keys = opts.keys
    this.index = opts.start || 0
  }

  val () {
    const key = this.keys[this.index]
    this.index++
    this.index %= this.keys.length
    return key
  }
}

module.exports = SeqKeyRotate
