'use strict';

var FilesizeWatcher = require('./FilesizeWatcher');
var exec = require('child_process').exec;

describe('FilesizeWatcher', function ({

  var watcher;

  afterEach(function() {
    watcher.stop();
  });

  it('should fire a "grew" event when the file grew in size', function(done) {

    var path = '/var/tmp/filesizewatcher.test';
    exec('rm -f ' + path + ' ; touch ' + path, function() {
      watcher = new FilesizeWatcher(path);

      watcher.on('grew', function(gain) {
        expect(gain).toBe(5);
        done();
      });

      exec('echo "test" > ' + path, function() {});

    });
  });

}))
