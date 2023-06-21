'use strict'

const SeqKeyRotate = require('./seq.key.rotate')

class SeqLazyClientRotate extends SeqKeyRotate {
  /**
   * @param {object} opts
   * @param {Array<any>} opts.keys
   * @param {Function} opts.loadFunc
   */
  constructor (opts) {
    super(opts)

    this.index = 0
    this.clients = []
    this.loadFunc = opts.loadFunc
  }

  val () {
    if (this.clients.length < this.keys.length) {
      const key = this.keys[this.index]
      this.index++
      this.index %= this.keys.length
      const client = this.loadFunc(key)
      this.clients.push(client)
      return client
    }

    const client = this.clients[this.index]
    this.index++
    this.index %= this.clients.length
    return client
  }
}

module.exports = SeqLazyClientRotate
