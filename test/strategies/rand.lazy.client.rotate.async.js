'use strict'

/* eslint-env mocha */

const _ = require('lodash')
const assert = require('assert')
const sinon = require('sinon')

const { strategies: { RandLazyClientRotateAsync } } = require('../../index')

describe('RandLazyClientRotateAsync - tests', () => {
  const keys = ['key1', 'key2', 'key3']
  const loadFunc = async (key) => `client-${key}`
  let instance = new RandLazyClientRotateAsync({ keys, loadFunc })
  let loadFuncStub
  let sampleStub

  beforeEach(() => {
    loadFuncStub = sinon.stub().callsFake(loadFunc)
    sampleStub = sinon.stub(_, 'sample')
    instance = new RandLazyClientRotateAsync({ keys, loadFunc: loadFuncStub })
  })

  afterEach(() => {
    sampleStub.restore()
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
    it('should load clients lazily and return them in sequence', async () => {
      for (const key of keys) {
        const expectedClient = `client-${key}`
        assert.strictEqual(await instance.val(), expectedClient)
        assert.ok(loadFuncStub.calledWith(key))
      }
    })

    it('should return a random client after all keys are used', async () => {
      for (let i = 0; i < keys.length; i++) {
        await instance.val() // Load all clients.
      }
      const expectedClient = `client-${keys[1]}`
      sampleStub.returns(expectedClient)
      assert.strictEqual(await instance.val(), expectedClient)
      assert.ok(sampleStub.calledWith(instance.clients)) // _.sample should be called with clients.
    })
  })
})
