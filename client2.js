'use strict';

var request = require('request');
var async = require('async');

var name, status;

var getUserName = function(callback) {
  request.get('http://localhost:8080/getUserName?id=1234',
    function(err, res, body) {
      var result = JSON.parse(body);
      callback(err, result.value);
    });
};

var getUserStatus = function(callback) {
  request.get('http://localhost:8080/getUserStatus?id=1234',
    function(err, res, body) {
      var result = JSON.parse(body);
      callback(err, result.value);
    });
};


