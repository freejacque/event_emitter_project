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

  function(callback) {
    request.get(url + 'getUserCountry?id=1234', function(err, res, body) {
      callback(null, 'Country: ' + JSON.parse(body).value);
    });
  },

  function(callback) {
    request.get(url + 'getUserAge?id=1234', function(err, res, body) {
      callback(null, 'Age: ' + JSON.parse(body).value);
    });
  }

],


//  this is the callback function that will be triggered when all of
//  functions in the series have finished, or if one of the series
//  throws an error
  function(err, results) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
    }
  }

);

// This is an example case for using async.series
//  We can collect the results of each step
// and do something with them once they are all finished
