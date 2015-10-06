var express = require('express');
var fs = require('fs');
// var routes = require('./routes');
var mongo = require('mongodb');
var http = require('http');
var path = require('path');
var monk = require('monk');
var app = express();
var bodyParser = require('body-parser');
var root = __dirname
var property, propertyValue;

app.use(bodyParser());
var db = monk('localhost:27017/shoppingMall');
var items = db.get('items');
var users = db.get('users');

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

app.get('/', function(req, res) {
  res.sendFile(root + '/views/index.html');
});

app.post('/', function(req, res) {
  var name = req.body.name
  var price = req.body.price;
  items.insert({name: name,
                price: price})
});

app.get('/users/new', function(req, res) {
  res.sendFile(root + '/views/users/new.html');
});

app.post('/users', function(req, res) {
  res.redirect('/');
})





var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s"%s', host, port);
});
