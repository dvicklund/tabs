var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require(__dirname + '/userModel');

var tabSchema = new mongoose.Schema({
	title: String,
	artist: String,	// This is the recording ARTIST
	author: {type: Schema.Types.ObjectId, ref: 'User'},	// This is the tab's AUTHOR
	dateCreated: {type: Date, default: Date.now()},
	ratings: [Number],
	tabBody: String,
	comments: [{body: String, date: Date}]
});

module.exports = mongoose.model('Tab', tabSchema);
