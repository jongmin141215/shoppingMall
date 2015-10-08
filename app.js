var express = require('express');
var fs = require('fs');
// var routes = require('./routes');
var mongo = require('mongodb');
var http = require('http');
var path = require('path');
var monk = require('monk');
var session = require('express-session')
var app = express();
var bodyParser = require('body-parser');
var root = __dirname
var property, propertyValue;
app.use(session({secret: 'ssshhhhh'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('jade', require('jade').__express);
var db = monk('localhost:27017/shoppingMall');
var items = db.get('items');
var users = db.get('users');
var sess;
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

app.get('/', function(req, res) {
  res.sendFile(root + '/views/index.html');
});

app.post('/', function(req, res) {
  var item = req.body
  items.insert(item, function(err) {
    if (err) {
      res.send('There was a problem saving the information. Please try again.')
    }
  });
});

app.get('/users/new', function(req, res) {
  res.sendFile(root + '/views/users/new.html');
});

app.post('/users', function(req, res) {
  res.redirect('/');
});

app.get('/items', function(req, res) {
  sess = req.session;
  items.find({}, function(err, docs) {
    res.render('items/index.jade', {items: docs});
  });
});

app.post('/items', function(req, res) {
  sess = req.session;
  sess.keyword = req.body.keyword;
  res.redirect('/result');
});

app.get('/result', function(req, res) {
  items.find({$text: {$search: sess.keyword}}, function(err, docs) {
    res.render('items/results.jade', {result: docs})
  })
});

app.get('/update/:id', function(req, res) {
  var itemId = req.params.id;
  items.find({_id: itemId}, function(err, docs) {
    res.render('items/update.jade', {updatedItem: docs[0]});
  })
})

app.post('/update/:id', function(req, res) {
  var updatedItem = req.body;
  items.update({_id: req.params.id}, updatedItem, function(err) {
    res.send('There was a problem updating your item. Please try again.')
  });
});


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s"%s', host, port);
});
