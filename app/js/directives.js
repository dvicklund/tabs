module.exports = function(app) {
	require('./directives/editable')(app);
	require('./directives/header')(app);
	require('./directives/newTab')(app);
	require('./directives/tabView')(app);
};
