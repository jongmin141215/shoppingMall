var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
// var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var root = __dirname

// app.set('port', process.env.PORT || 3000);

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
})

app.get('/', function(req, res) {
  res.sendFile(root + '/views/index.html');
})

app.get('/items', function(req, res) {
  mongoose.model('Item').find(function(err, item) {
    res.send(item);
  })
})



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s"%s', host, port);
});
