'use strict'

const KEY_ROTATE_STRATEGIES = Object.freeze({
  SEQ: 1,
  RAND: 2,
  SEQ_LAZY_CLI: 3,
  RAND_LAZY_CLI: 4,
  SEQ_LAZY_CLI_ASYNC: 5,
  RAND_LAZY_CLI_ASYNC: 6
})

module.exports = {
  KEY_ROTATE_STRATEGIES
}
