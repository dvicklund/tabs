module.exports = function(app) {
	require('./controllers/tabCtrl')(app);
	require('./controllers/authCtrl')(app);
	require('./controllers/profileCtrl')(app);
	require('./controllers/searchCtrl')(app);
};
