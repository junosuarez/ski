var assert = require('assert')
var S = require('./s')
var K = require('./k')
var I = require('./i')

var tests = {}

tests['S substitution'] = function () {
  function x () {
    x.calledWith = arguments[0]
    return x2
  }
  function x2 () {
      x2.calledWith = arguments[0]
    }
  function y () {
    y.calledWith = arguments[0]
    return 'y2'
  }

  S(x, y, 'z')

  assert.equal(x.calledWith, 'z')
  assert.equal(y.calledWith, 'z')
  assert.equal(x2.calledWith, 'y2')
}

tests['K constant'] = function () {
  var k = K(10)
  assert.equal(k(10), 10)
  assert.equal(k(0), 10)
  assert.equal(k(false), 10)
  assert.equal(k(), 10)
}

tests['I equality'] = function () {
  assert.equal(I(5), 5)
  assert.equal(I(true), true)
}

Object.keys(tests).forEach(function (test) {
  console.log('* %s', test)
  tests[test]()
})
console.log('ok')
