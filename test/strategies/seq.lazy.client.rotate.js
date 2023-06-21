'use strict'

/* eslint-env mocha */

const assert = require('assert')
const sinon = require('sinon')

const { strategies: { SeqLazyClientRotate } } = require('../../index')

describe('SeqLazyClientRotate - tests', () => {
  const keys = ['key1', 'key2', 'key3']
  const loadFunc = (key) => `client-${key}`
  let instance = new SeqLazyClientRotate({ keys, loadFunc })
  let loadFuncStub

  beforeEach(() => {
    loadFuncStub = sinon.stub().callsFake(loadFunc)
    instance = new SeqLazyClientRotate({ keys, loadFunc: loadFuncStub })
  })

  after(() => {
    sinon.restore()
  })

  describe('constructor', () => {
    it('should initialize keys and clients correctly', () => {
      assert.deepStrictEqual(instance.keys, keys)
      assert.deepStrictEqual(instance.clients, [])
    })

    it('should initialize loadFunc correctly', () => {
      assert.strictEqual(instance.loadFunc, loadFuncStub)
    })
  })

  describe('val', () => {
    it('should load clients lazily and return them in sequence', () => {
      keys.forEach((key) => {
        const expectedClient = `client-${key}`
        assert.strictEqual(instance.val(), expectedClient)
        assert.ok(loadFuncStub.calledWith(key))
      })
    })

    it('should return existing clients without calling loadFunc after all keys are used', () => {
      keys.forEach(() => instance.val()) // Load all clients.
      loadFuncStub.resetHistory() // Reset call history for stub.
      keys.forEach((key) => {
        const expectedClient = `client-${key}`
        assert.strictEqual(instance.val(), expectedClient)
        assert.ok(loadFuncStub.notCalled) // loadFunc should not be called.
      })
    })

    it('should wrap around to the beginning of the client array', () => {
      keys.forEach(() => instance.val()) // Load all clients.
      const expectedClient = `client-${keys[0]}`
      assert.strictEqual(instance.val(), expectedClient) // It should wrap around.
    })
  })
})
