'use strict';

var request = require('request');
var async = require('async');

var name, status;


// requests wrapped in named functions
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

async.parallel([getUserName, getUserStatus], function(err, results) {
  console.log('The status of user ', results[0], ' is', results[1]);
});
