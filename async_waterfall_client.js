'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

async.waterfall([

  function(callback) {
    request.get(url + 'getSessionId', function(err, res, body) {
      callback(null, JSON.parse(body).value);
    });
  },


])
