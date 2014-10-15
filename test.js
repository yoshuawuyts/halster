/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var halster = require('./index');

/**
 * Test
 */

describe('halster', function() {
  it('should assert argument types', function() {
    halster.bind(halster, 123)
      .should.throw('halster: opts should be an object');
  });

  it('should initialize empty properties', function() {
    var links = halster({});
    links._stash.should.be.of.type('object');
    links._default.should.be.of.type('function');
  });

  it('should set passed in properties', function() {
    function fn() {};
    fn();
    var links = halster({default: fn});
    links._default.should.eql(fn);
  });

  it('should invert values', function() {
    halster.bind(halster, {invert: true})
      .should.not.throw();
  });
});

describe('.set()', function() {
  it('should assert argument types', function() {
    var links = halster({});

    links.set.bind(links, 123)
      .should.throw('halster: val should be an object');

    links.set.bind(links, {})
      .should.not.throw('halster: previous could not be extracted from data');

    links.set.bind(links, {links:{previous: 'foo'}})
      .should.throw('halster: next could not be extracted from data');

    links.set.bind(links, {links: {previous: 'foo', next: 'bar'}})
      .should.not.throw('halster: next could not be extracted from data');
  });

  it('should accept multiple link syntaxes', function() {
    var ln = halster({});
    ln.set.bind(ln, {_links: {_previous: 'foo', _next: 'bar'}})
      .should.not.throw('halster: next could not be extracted from data');

    ln.set.bind(ln, {links: {previous: 'foo', next: 'bar'}})
      .should.not.throw('halster: next could not be extracted from data');

    ln.set.bind(ln, {links: {previous: {url: 'foo'}, next: {url: 'bar'}}})
      .should.not.throw('halster: next could not be extracted from data');

    ln.set.bind(ln, {links: {previous: {href: 'foo'}, next: {href: 'bar'}}})
      .should.not.throw('halster: next could not be extracted from data');
  });
});

describe('.get()', function() {
  it('should assert argument types', function() {
    var links = halster({});
    links.get();
  });

  it('should return stored urls', function() {
    var ln = halster({
      default: function() {
        return 'baz';
      }
    });

    ln.set({links: {previous: 'foo', next: 'bar'}})

    ln.get({previous: true}).should.eql('foo');
    ln.get({next: true}).should.eql('bar');
    ln.get().should.eql('baz');
  });
});

describe('invert', function() {
  it('should correctly invert links', function() {
    var ln = halster({
      invert: true,
      previous: function(val) {
        return val;
      },
      next: function(val) {
        return val;
      }
    });

    ln.set({links: {previous: 123, next: 456}});
    ln.set({links: {previous: 124, next: 455}});

    ln.get({previous: true}).should.eql(124);
    ln.get({next: true}).should.eql(455);

    ln.set({links: {previous: 123, next: 456}});

    ln.get({previous: true}).should.eql(124);
    ln.get({next: true}).should.eql(455);
  });
});
