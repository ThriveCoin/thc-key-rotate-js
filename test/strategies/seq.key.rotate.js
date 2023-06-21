'use strict'

/* eslint-env mocha */

const assert = require('assert')

const { strategies: { SeqKeyRotate } } = require('../../index')

describe('SeqKeyRotate - tests', () => {
  const keys = ['key1', 'key2', 'key3']
  let instance = new SeqKeyRotate({ keys })

  beforeEach(() => {
    instance = new SeqKeyRotate({ keys })
  })

  describe('constructor', () => {
    it('should initialize keys correctly', () => {
      assert.deepStrictEqual(instance.keys, keys)
    })

    it('should start at index 0 if no start index is provided', () => {
      assert.strictEqual(instance.index, 0)
    })

    it('should start at provided start index', () => {
      const startIndex = 1
      instance = new SeqKeyRotate({ keys, start: startIndex })
      assert.strictEqual(instance.index, startIndex)
    })
  })

  describe('val', () => {
    it('should return the next key in sequence', () => {
      keys.forEach((key) => {
        assert.strictEqual(instance.val(), key)
      })
    })

    it('should wrap around to the beginning of the key array', () => {
      keys.forEach(() => instance.val())
      assert.strictEqual(instance.val(), keys[0])
    })

    it('should start at the provided start index', () => {
      const startIndex = 1
      instance = new SeqKeyRotate({ keys, start: startIndex })
      assert.strictEqual(instance.val(), keys[startIndex])

      const nextIndex = (startIndex + 1) % keys.length
      assert.strictEqual(instance.val(), keys[nextIndex])
    })
  })
})
