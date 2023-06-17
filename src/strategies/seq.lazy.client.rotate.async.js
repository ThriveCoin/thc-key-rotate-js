'use strict'

const SeqLazyClientRotate = require('./seq.lazy.client.rotate')

class SeqLazyClientRotateAsync extends SeqLazyClientRotate {
  async val () {
    if (this.clients.length < this.keys.length) {
      const key = this.keys[this.index]
      this.index++
      this.index %= this.keys.length
      const client = await this.loadFunc(key)
      this.clients.push(client)
      return client
    }

    const client = this.clients[this.index]
    this.index++
    this.index %= this.clients.length
    return client
  }
}

module.exports = SeqLazyClientRotateAsync
