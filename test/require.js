'use strict';
require('../').install({
  extension: '.html'
});

var test = require('tape');
test('require html', function (t) {
  t.plan(2);
  var fun = require('./template.html').toString();
  t.ok(fun.match(/Hello, World!/));
  t.ok(fun.match(/Chinese\(/));
});

