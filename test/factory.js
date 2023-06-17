'use strict'

/* eslint-env mocha */

const assert = require('assert')

const {
  constants: {
    KEY_ROTATE_STRATEGIES
  },
  factory,
  strategies: {
    RandKeyRotate,
    RandLazyClientRotate,
    RandLazyClientRotateAsync,
    SeqKeyRotate,
    SeqLazyClientRotate,
    SeqLazyClientRotateAsync
  }
} = require('../index')

describe('factory - test', () => {
  const keyOpts = { keys: ['key1', 'key2'] }
  const lazyOpts = { keys: ['key1', 'key2'], loadFunc: (key) => `client-${key}` }
  const lazyOptsAsync = { keys: ['key1', 'key2'], loadFunc: async (key) => `client-${key}` }

  it('should return SeqKeyRotate instance for SEQ strategy', () => {
    const instance = factory(KEY_ROTATE_STRATEGIES.SEQ, keyOpts)
    assert(instance instanceof SeqKeyRotate)
  })

  it('should return RandKeyRotate instance for RAND strategy', () => {
    const instance = factory(KEY_ROTATE_STRATEGIES.RAND, keyOpts)
    assert(instance instanceof RandKeyRotate)
  })

  it('should return SeqLazyClientRotate instance for SEQ_LAZY_CLI strategy', () => {
    const instance = factory(KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI, lazyOpts)
    assert(instance instanceof SeqLazyClientRotate)
  })

  it('should return RandLazyClientRotate instance for RAND_LAZY_CLI strategy', () => {
    const instance = factory(KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI, lazyOpts)
    assert(instance instanceof RandLazyClientRotate)
  })

  it('should return SeqLazyClientRotateAsync instance for SEQ_LAZY_CLI_ASYNC strategy', () => {
    const instance = factory(KEY_ROTATE_STRATEGIES.SEQ_LAZY_CLI_ASYNC, lazyOptsAsync)
    assert(instance instanceof SeqLazyClientRotateAsync)
  })

  it('should return RandLazyClientRotateAsync instance for RAND_LAZY_CLI_ASYNC strategy', () => {
    const instance = factory(KEY_ROTATE_STRATEGIES.RAND_LAZY_CLI_ASYNC, lazyOptsAsync)
    assert(instance instanceof RandLazyClientRotateAsync)
  })

  it('should throw an error for unsupported strategy', () => {
    assert.throws(() => factory('UNSUPPORTED_STRATEGY', keyOpts), /ERR_STRATEGY_NOT_SUPPORTED/)
  })
})
