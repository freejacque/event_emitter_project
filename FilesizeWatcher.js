'use strict'

var fs = require('fs');

var FilesizeWatcher = function(path) {
  var self = this;

  self.callbacks = {};

  if(/^\//.test(path) === false) {
    self.callbacks['error']('Path does not start with a slash');
    return;
  }

  fs.stat(path, function(err, status) {
    self.lastfilesize = stats.size;
  });

  self.interval = setInterval(
    function() {
      fs.stat(path, function(err, stats) {
        if(stats.size > self.lastfilesize) {
          self.callbacks['grew'](stats.size - self.lastfilesize);
          self.lastfilesize = stats.size;
        }
        if(stats.size < self.lastfilesize) {
          self.callbacks['shrank'](self.lastfilesize - stats.size);
          self .lastfilesize = stats.size;
        }
      }, 1000);
    });
};


