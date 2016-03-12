var express = require('express');
var app = express();
var mongoose = require('mongoose');
process.env.APP_SECRET = process.env.APP_SECRET || 'secretstringnevergonnatellyouwhatitis';

var router = require(__dirname + '/routes/tabRouter');
var auth = require(__dirname + '/routes/authRouter');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tabdb');

app.use(express.static(__dirname + '/build'));
app.use('/api', router);
app.use('/api', auth);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('server serving on port: ' + port);
});
