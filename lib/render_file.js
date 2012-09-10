var fs = require('fs');
var opts = require('./options');
var hogan = require('./hogan');

var cache = {};

module.exports = function(path, locals, callback) {
  // allow for function(path, callback) signature
  if (typeof locals === 'function') {
    callback = locals;
    locals = {};
  }

  locals = locals || {};
  callback = callback || function() {};

  try {
    var template = cache[path] || fs.readFileSync(path, 'utf8');
    opts.get('cache') && !cache[path] && (cache[path] = template);

    var output = hogan.compile(template, opts.all()).render(locals);

    callback(null, output);
  }
  catch(e) {
    callback(e);
  }
};
