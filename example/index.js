var fs = require('fs');
var hogan = require('../lib/fs_hogan').set({ templates: './templates' });

hogan.renderFile('main.hjs', { title: 'My First Post' }, function(err, text) {
  fs.writeFileSync('main.html', text);
});
