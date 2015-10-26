'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

async.series([

  function(callback) {
    request.get(url + 'getUserName?id=1234', function(err, res, body) {
      callback(null, 'Name: ' + JSON.parse(body).value);
    });
  },

  function(callback) {
    request.get(url + 'getUserStatus?id=1234', function(err, res, body) {
      callback(null, 'Status: ' + JSON.parse(body).value);
    });
  },



])
