/**
 * Module dependencies
 */

var invert = require('burl-invert');
var assert = require('assert');
var burl = require('burl');

/**
 * Prototype.
 */

var hal = Hal.prototype;

/**
 * Exports.
 */

module.exports = Hal;

/**
 * Hal.
 *
 * @param {Object} opts
 * @return {Self}
 * @api public
 */

function Hal(opts) {
  if(!(this instanceof Hal)) return new Hal(opts);

  assert.equal(typeof opts, 'object', 'halster: opts should be an object');

  this._default = opts.default || function(val) {return val};
  this._stash = opts.invert
    ? burl(opts)
    : invert(burl(opts));

  return this;
}

/**
 * Set.
 *
 * @param {object} val
 * @api public
 */

hal.set = function(val) {
  assert.equal(typeof val, 'object', 'halster: val should be an object');

  var links = val.links || val._links || val;
  var prev = links.previous || links._previous;
  var next = links.next || links._next;

  if ('object' == typeof prev) prev = prev.url || prev._url;
  if ('object' == typeof next) next = next.url || next._url;

  assert(prev, 'halster: previous could not be extracted from data');
  assert(next, 'halster: next could not be extracted from data');

  this._stash.set({
    previous: prev,
    next: next
  });
};

/**
 * Get.
 *
 * @param {Object} opts
 * @return {String}
 * @api public
 */

hal.get = function(opts) {
  assert(!opts || 'object' == typeof opts, 'halster: opts should be an object');
  opts = opts || {};
  var ln = this._stash.get();

  if (opts.previous) return ln.previous;
  if (opts.next) return ln.next;

  return this._default();
};
