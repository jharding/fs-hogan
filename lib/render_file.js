var fs = require('fs');
var compiler = require('./compiler');

module.exports = function(options) {
  options = options || {};

  var cache = {};

  return  function(path, locals, callback) {
    if (typeof locals === 'function') {
      callback = locals;
      locals = {};
    }

    locals = locals || {};

    try {
      var template = cache[path] || fs.readFileSync(path, 'utf8');
      options.cache && !cache[path] && (cache[path] = template);

      var output = compiler.compile(template, options).render(locals);

      callback(null, output);
    }
    catch(e) {
      callback(e);
    }
  };
};
