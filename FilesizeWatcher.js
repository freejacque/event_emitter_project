'use strict'

var fs = require('fs');

var FilesizeWatcher = function(path) {
  var self = this;

  self.callbacks = {};

  if(/^\//.test(path) === false) {
    self.callbacks['error']('Path does not start with a slash');
    return;
  }
}
