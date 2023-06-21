'use strict'

const RandKeyRotate = require('./src/strategies/rand.key.rotate')
const RandLazyClientRotate = require('./src/strategies/rand.lazy.client.rotate')
const RandLazyClientRotateAsync = require('./src/strategies/rand.lazy.client.rotate.async')
const SeqKeyRotate = require('./src/strategies/seq.key.rotate')
const SeqLazyClientRotate = require('./src/strategies/seq.lazy.client.rotate')
const SeqLazyClientRotateAsync = require('./src/strategies/seq.lazy.client.rotate.async')

const factory = require('./src/factory')

const constants = require('./src/constants')

module.exports = {
  constants,
  factory,
  strategies: {
    RandKeyRotate,
    RandLazyClientRotate,
    RandLazyClientRotateAsync,
    SeqKeyRotate,
    SeqLazyClientRotate,
    SeqLazyClientRotateAsync
  }
}
