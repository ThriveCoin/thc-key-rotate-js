'use strict'

const RandKeyRotate = require('./strategies/rand.key.rotate')
const RandLazyClientRotate = require('./strategies/rand.lazy.client.rotate')
const RandLazyClientRotateAsync = require('./strategies/rand.lazy.client.rotate.async')
const SeqKeyRotate = require('./strategies/seq.key.rotate')
const SeqLazyClientRotate = require('./strategies/seq.lazy.client.rotate')
const SeqLazyClientRotateAsync = require('./strategies/seq.lazy.client.rotate.async')

const { KEY_ROTATE_STRATEGIES } = require('./constants')

const factory = (strategy, opts) => {
  switch (strategy) {
    case KEY_ROTATE_STRATEGIES.SEQ:
      return new SeqKeyRotate(opts)
    case KEY_ROTATE_STRATEGIES.RAND:
      return new RandKeyRotate(opts)
    case KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI:
      return new SeqLazyClientRotate(opts)
    case KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI:
      return new RandLazyClientRotate(opts)
    case KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI_ASYNC:
      return new SeqLazyClientRotateAsync(opts)
    case KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI_ASYNC:
      return new RandLazyClientRotateAsync(opts)
    default:
      throw new Error('ERR_STRATEGY_NOT_SUPPORTED')
  }
}

module.exports = factory
