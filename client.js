'use strict';

var request = require('request');

request.get(
  'http://localhost:8080/getUsername?id=1234',
  function(err, res, body) {
    var result = JSON.parse(body);
    var name = result.value;

    request.get(
      'http://localhost:8080/getUsername?id=1234',
      function(err, res, body) {
        var result = JSON.parse(body);
        var status = result.value;

        console.log('The status of the user ', name, ' is ', status);
      });

  });
