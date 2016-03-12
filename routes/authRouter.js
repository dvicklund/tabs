var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handleError');
var basicHttp = require(__dirname + '/../lib/basicHttpAuth');
var User = require(__dirname + '/../models/userModel');

var authRouter = module.exports = express.Router();

authRouter.post('/signup', jsonParser, function(req, res) {
  User.findOne({username: req.body.username}, function(err, checkUser) {
    if(!checkUser) {
      var user = new User();
      user.auth.basic.username = req.body.username;
      user.username = req.body.username;
      user.hashPassword(req.body.password);

      user.save(function(err, data) {
        if(err) return handleError(err, res);
          user.generateToken(function(err, token) {
          res.json({token: token});
        });
      });
    } else {
      console.log('Nuuupe - attempting to create already existing user');
      return res.json({msg: "User already exists!"});
    }
  });
});

authRouter.get('/signin', basicHttp, function(req, res) {
  if(!(req.auth.username && req.auth.password)) {
    console.log('Nuuupe - No authentication information provided');
    return res.status(401).json({msg: 'You might want to use a username and password'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('Nuuupe - Error contacting DB');
      return res.status(401).json({msg: "Something is wrong - it's not you, it's me"});
    }

    if(!user) {
      console.log('Nuuupe - User not found');
      return res.status(401).json({msg: 'You do not exist!  (Try creating a user)'});
    }

    user.checkPassword(req.auth.password, function(err, match) {
      if(!match) return res.status(401).json({msg: "Plz don't feed the trolls"});
      user.generateToken(function(err, token) {
        if(err) return handleError(err, res);
        return res.json({token: token});
      });
    });
  });
});