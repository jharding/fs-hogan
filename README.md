fs-hogan
========

fs-hogan is a fork of [Hogan.js][hogan.js], a fast mustache-compatible templating engine that supports template inheritance (supers), a feature that may make it into the [official spec for mustache v2.0.0][inheritance]. The goal of fs-hogan is to take advantage of Hogan.js while also making rendering templates from the file system a breeze.

[hogan.js]: http://twitter.github.com/hogan.js/
[inheritance]: https://github.com/mustache/spec/issues/38

Installation
------------

```
$ npm install fs-hogan
```

Usage
-----

### Require

```javascript
var hogan = require('fs-hogan');
```

### Options

* __cache__: if `true`, fs-hogan will cache file templates after they are read from disk. [default: `false`] 
* __templates__: the path fs-hogan will look for templates in. [default: `'views'`] 
* __extension__: the file extension used for templates. [default: `'hjs'`] 

In addition to these options, fs-hogan also supports the [compilation options][options] of Hogan.js.

[options]: https://github.com/twitter/hogan.js#compilation-options

### API

#### hogan.set(option, value)

Sets `option` to `value`. To set multiple options at once, you can pass in an object that maps keys to options. Returns `hogan` so you can configure fs-hogan while requiring it. 

#### hogan.renderFile(path, [context], [callback])

Asynchronously renders the template that exists at `path` with the context provided by `context` and then calls `callback` with 2 arguments: `err` and `text`. 

When `path` is a relative path, `templates` will be used as the base path.

### Example

A working example of fs-hogan exists in the */examples* directory.

### Express

fs-hogan works great with [Express][express].

[express]: http://expressjs.com/

```javascript
var express = require('express');
var hogan = require('fs-hogan');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');                                                
  hogan.set({ templates: app.get('views'), extension: app.get('view engine') });
  app.engine('hjs', hogan.renderFile);
});
```

Issues
------

Found a bug? Create an issue on GitHub.

https://github.com/jharding/fs-hogan/issues

Versioning
----------

For transparency and insight into the release cycle, releases will be numbered with the follow format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backwards compatibility bumps the major
* New additions without breaking backwards compatibility bumps the minor
* Bug fixes and misc changes bump the patch

For more information on semantic versioning, please visit http://semver.org/.

License
-------

Copyright (c) 2012 [Jake Harding](http://thejakeharding.com)  
Licensed under the MIT License.
