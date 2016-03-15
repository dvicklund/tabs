var express = require("express");
var Tab = require('../models/tabModel');
var bodyParser = require('body-parser');
var handleError = require('../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basicHttpAuth');

var tabRouter = module.exports = exports = express.Router();

tabRouter.get('/tabs', function(req, res) {
  Tab.find({}, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

// TODO: Edit to make query for popular tabs
tabRouter.get('/tabs/popular', function(req, res) {
  Tab.find().limit(100).sort({views: -1}).exec(function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  })
})

tabRouter.get('/tab/:id', function(req, res) {
  Tab.find({_id: req.params.id}, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  })
});

//
//  SEARCH
//
// tabRouter.get('/tab/search/title/:search', bodyParser.json(), function(req, res) {
//   var query = {title: new RegExp(req.params.search, 'i')};
//   Tab.find(query, function(err, data) {
//     if(err) return handleError(err, res);
//     res.json(data);
//   })
// })
//
// tabRouter.get('/tab/search/artist/:search', function(req, res) {
//   var query = {artist: new RegExp(req.params.search, 'i')};
//   Tab.find(query, function(err, data) {
//     if(err) return handleError(err, res);
//     res.json(data);
//   })
// })

tabRouter.get('/tab/search/:search', function(req, res) {
  var rxp = new RegExp(req.params.search, 'i');
  var query = {$or: [{artist: rxp}, {title: rxp}]};
  Tab.find(query, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  })
})

tabRouter.post('/tab', bodyParser.json(), function(req, res) {
  var newTab = new Tab(req.body);
  newTab.save(function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  });
});

tabRouter.patch('/tab/view/:id', bodyParser.json(), function(req, res) {
  Tab.findOneAndUpdate({_id: req.params.id}, {$inc: {views: 1}}, {new: true}, function(err, data) {
    if(err) return handleError(err, res);
    res.json(data);
  })
})

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
