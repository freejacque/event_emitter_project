'use strict';

// load the fs module for the stat function
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

// FilesizeWatcher object constructor function
var FilesizeWatcher = function(path) {
  // the object instance variable is set to a local variable
  // so that the object can be instantiated within callback functions,
  //  where 'this' would point to another object
  var self = this;

// check if the file begins with a slash, if not throw error message
  if(/^\//.test(path) === false) {
    // added to make sure that the the error callback is called after it is defined
    process.nextTick(function() {
      self.emit('error', 'Path does not start with a slash');
    });
    return;
  }

// used to store the file size of the given path
  fs.stat(path, function(err, stats) {
    self.lastfilesize = stats.size;
  });

// 1-sec interval for checking file size using the stat function
  self.interval = setInterval(
    function() {
      fs.stat(path, function(err, stats) {
        // if the file grows in size
        if(stats.size > self.lastfilesize) {
          self.emit('grew', stats.size - self.lastfilesize);
          self.lastfilesize = stats.size;
        }
        // if the file size decreases
        if(stats.size < self.lastfilesize) {
          self.emit('shrank', self.lastfilesize - stats.size);
          self.lastfilesize = stats.size;
        }
      }, 1000);
    });
};

//  on method: stores the callback under the event name
FilesizeWatcher.prototype.on = function(eventType, callback) {
  this.callbacks[eventType] = callback;
};

//  cancels the interval set in the constructor
FilesizeWatcher.prototype.stop = function() {
  clearInterval(this.interval);
};

module.exports = FilesizeWatcher;
