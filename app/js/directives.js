module.exports = function(app) {
	require('./directives/editable')(app);
	require('./directives/headerDirective')(app);
	require('./directives/newTab')(app);
	require('./directives/tabView')(app);
};
