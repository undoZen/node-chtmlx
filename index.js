var fs = require('fs');
var chtmlx = require('chtmlx');

var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  options = options || {};
  var coffee = options.coffee || require('coffee-script');

  require.extensions[options.extension || '.chtmlx'] = function(module, filename) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    try {
      src = coffee.compile(chtmlx(src), { 'bare': true });
    } catch (e) {
      throw new Error('Error transforming ' + filename + ' from chtmlx: ' + e.toString());
    }
    module._compile(src, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};
