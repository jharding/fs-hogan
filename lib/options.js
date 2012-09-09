// options
// -------

// defaults
// ========

var defaults = {
  // fs-hogan options
  cache: false,
  templates: 'views',
  extension: 'hjs',
  // hogan compiler options
  asString: false,
  sectionTags: undefined,
  delimiters: undefined,
  disableLambda: false
};
var opts = extend({}, defaults);
var optsCopy = extend({}, opts);

// interface
// =========

exports.set = function(key, value) {
  // invalidate copy
  optsCopy = null;

  if (typeof key === 'string') {
    opts[key] = value;
  }

  else if (typeof key === 'object') {
    extend(opts, key);
  }
};

exports.get = function(key) {
  return opts[key];
};

exports.all = function() {
  return optsCopy ? optsCopy : optsCopy = extend({}, opts);
};

// helper functions
// ================

function extend(target) {
 var objs = Array.prototype.slice.call(arguments, 1);
 objs.forEach(function(obj) {
   Object.keys(obj).forEach(function(key) {
      target[key] = obj[key];
   });
 });

 return target;
}
