var fs = require('fs');
var path = require('path');
var opts = require('./options');
var hogan = require('./hogan');

var fileCache = {};
var regexCache = {};

module.exports = function(tPath, context, callback) {

  // allow for function(tPath, callback) signature
  if (typeof context === 'function') {
    callback = context;
    context = {};
  }

  context = context || {};
  callback = callback || function() {};

  // ensure tPath is absolute
  if (tPath.indexOf(path.sep) !== 0) {
    tPath = path.resolve(path.join(opts.get('templates'), tPath));
  }

  // add extension if it's missing
  var ext = opts.get('extension');
  var regex = regexCache[ext] || (regexCache[ext] = new RegExp('\.' + ext + '$'));
  !regex.test(tPath) &&  (tPath += '.' + ext);

  try {
    var template = fileCache[tPath] || fs.readFileSync(tPath, 'utf8');
    opts.get('cache') && !fileCache[tPath] && (fileCache[tPath] = template);

    var text = hogan.compile(template, opts.all()).render(context);

    callback(null, text);
  }
  catch(e) {
    callback(e);
  }
};
