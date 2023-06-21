'use strict'

const _ = require('lodash')

const RandLazyClientRotate = require('./rand.lazy.client.rotate')

class RandLazyClientRotateAsync extends RandLazyClientRotate {
  async val () {
    if (this.clients.length < this.keys.length) {
      const key = this.keys[this.clients.length]
      const client = await this.loadFunc(key)
      this.clients.push(client)
      return client
    }

    return _.sample(this.clients)
  }
}

module.exports = RandLazyClientRotateAsync
