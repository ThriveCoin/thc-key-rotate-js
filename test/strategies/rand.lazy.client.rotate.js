'use strict'

/* eslint-env mocha */

const _ = require('lodash')
const assert = require('assert')
const sinon = require('sinon')

const { strategies: { RandLazyClientRotate } } = require('../../index')

describe('RandLazyClientRotate - tests', () => {
  const keys = ['key1', 'key2', 'key3']
  const loadFunc = (key) => `client-${key}`
  let instance = new RandLazyClientRotate({ keys, loadFunc })
  let loadFuncStub
  let sampleStub

  beforeEach(() => {
    loadFuncStub = sinon.stub().callsFake(loadFunc)
    sampleStub = sinon.stub(_, 'sample')
    instance = new RandLazyClientRotate({ keys, loadFunc: loadFuncStub })
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
    it('should load clients lazily and return them in sequence', () => {
      keys.forEach((key) => {
        const expectedClient = `client-${key}`
        assert.strictEqual(instance.val(), expectedClient)
        assert.ok(loadFuncStub.calledWith(key))
      })
    })

    it('should return a random client after all keys are used', () => {
      keys.forEach(() => instance.val()) // Load all clients.
      const expectedClient = `client-${keys[1]}`
      sampleStub.returns(expectedClient)
      assert.strictEqual(instance.val(), expectedClient)
      assert.ok(sampleStub.calledWith(instance.clients)) // _.sample should be called with clients.
    })
  })
})
