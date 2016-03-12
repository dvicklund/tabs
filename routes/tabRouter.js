var express = require("express");
var Tab = require('../models/tabModel');
var bodyParser = require('body-parser');
var handleError = require('../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basicHttpAuth');

var tabRouter = module.exports = exports = express.Router();

tabRouter.get('/tabs', function(req, res) {
  Tab.find({}, function(err, data) {
    if(err) return handleError(err, res);
    console.log("result from tabs:get : " + data);
    res.send(data);
  });
});

tabRouter.post('/tab', bodyParser.json(), function(req, res) {
  var newTab = new Tab(req.body);
  newTab.save(function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

tabRouter.put('/tab/:id', bodyParser.json(), function(req, res) {
  var tabData = req.body;
  delete tabData._id;
  Tab.update({_id: req.params.id}, tabData, function(err, data) {
    if(err) return handleError(err, res);
    res.json({msg: 'nailed it'});
  });
});

tabRouter.delete('/tab/:id', function(req, res) {
  Tab.remove({_id: req.params.id}, function(err) {
    if(err) return handleError(err, res);
    res.json({msg: "nailed it"});
  });
});
