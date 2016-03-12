module.exports = function(app) {
	require('./tabs/tabController')(app);
	require('./users/userController')(app);
};