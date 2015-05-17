var fs = require('fs');
var browserify = require('browserify'),
  stringify = require('stringify');

var bundle = browserify();
bundle.transform(stringify(['.html', '.tpl', '.hbs']))
bundle.add(__dirname + '/../src/main.js');

bundle.bundle().pipe(fs.createWriteStream(__dirname + '/bundle.js'));