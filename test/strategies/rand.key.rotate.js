'use strict'

/* eslint-env mocha */

const _ = require('lodash')
const assert = require('assert')
const sinon = require('sinon')

const { strategies: { RandKeyRotate } } = require('../../index')

describe('RandKeyRotate - tests', () => {
  const keys = ['key1', 'key2', 'key3']
  let instance = new RandKeyRotate({ keys })

  describe('constructor', () => {
    it('should initialize keys correctly', () => {
      instance = new RandKeyRotate({ keys })
      assert.deepStrictEqual(instance.keys, keys)
    })
  })

  describe('val', () => {
    let stub

    before(() => {
      stub = sinon.stub(_, 'sample').returns('key2')
    })

    after(() => {
      stub.restore()
    })

    it('should return a random key', () => {
      instance = new RandKeyRotate({ keys })
      const res = instance.val()
      assert.strictEqual(res, 'key2')
      sinon.assert.calledWith(stub, keys)
    })
  })
})
