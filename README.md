# halster
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Extract and store `hal` `previous` and `next` links.

## Installation
```bash
npm install halster
```

## Usage
```js
var halster = require('halster');

var links = halster({
  default: function() {
    return 'http://mysite.com/api';
  },
  previous: function(val) {
    return 'http://mysite.com/api?until=' + val;
  },
  next: function(val) {
    return 'http://mysite.com/api?from=' + val;
  },
  normalize: function(val) {
    return val.splice(13)[1];
  }
});

links.set({
  _links: {
    previous: {
      url: 'until=12345677'
    },
    next: {
      url: 'from=12345677'
    }
  }
});

links.get({previous: true});
// => 'http://mysite.com/api?until=12345677'
```

## API
#### var links = halster()
Create a new halster instance. Takes an object of arguments. `default` is the
default link to use if no `previous` or `next` were given. If `previous` or
`default` are given the links are passed down to [`burl`][burl] and handled
there. The `normalize` link functions the same as in `burl`, converting urls
into integers that can be compared to determine the newest / oldest link.
Optionally you can also set `invert: true` to flip `next` and `previous`.
```js
var halster = require('halster');

var links = halster({
  default: function() {
    return 'http://mysite.com/api';
  },
  previous: function(val) {
    return 'http://mysite.com/api?until=' + val;
  },
  next: function(val) {
    return 'http://mysite.com/api?from=' + val;
  },
  normalize: function(val) {
    return val.splice(13)[1];
  }
});
```

#### .set()
Pass in an object with a `links` / `_links` property and save the correct link
within halster.
```js
links.set({
  _links: {
    previous: {
      url: 'until=12345677'
    },
    next: {
      url: 'from=12345677'
    }
  }
});
```

#### .get()
Get an url. Can be passed an object with either `next` or `previous` set to true
for the corresponding link. If no argument is provided the default link will be
returned.
```js
links.get({previous: true});
// => 'http://mysite.com/api?until=12345677'

links.get();
// => 'http://mysite.com/api'
```

## See also
- [burl][burl]
- [linkstash][linkstash]

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/halster.svg?style=flat-square
[npm-url]: https://npmjs.org/package/halster
[travis-image]: https://img.shields.io/travis/yoshuawuyts/halster.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/halster
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/halster.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/halster?branch=master
[downloads-image]: http://img.shields.io/npm/dm/halster.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/halster

[burl]: https://github.com/yoshuawuyts/burl
[linkstash]: https://github.com/yoshuawuyts/linkstash
