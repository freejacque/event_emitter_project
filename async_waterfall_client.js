'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

// form: async.waterfall(arrayOfAsyncFunctions, callbackFunction)
// callback is passed as the last argument for each step function
async.waterfall([

    function(callback) {
      request.get(url + 'getSessionId', function(err, res, body) {
        callback(null, JSON.parse(body).value);
      });
    },

    function(sId, callback) {
      request.get(url + 'getUserId?sessionId=' + sId, function(err, res, body) {
        callback(null, sId, JSON.parse(body).value);
      });
    },

    function(sId, uId, callback) {
      request.get(url + 'getUserName?userId=' + uId, function(err, res, body) {
        callback(null, JSON.parse(body).value, sId)
      })
    }

  ],

  //  callback function
  function(err, name, sId) {
    console.log('Name: ', name);
    console.log('SessionID: ', sId);
  }

);

// async waterfall executes steps in a series and lets
// each successive step access the results of previous steps
