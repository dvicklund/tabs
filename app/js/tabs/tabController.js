module.exports = function(app) {
	app.controller('tabController', ['$scope', 'crudResource', function($scope, $crudResource) {
		var tabCrud = $crudResource('tab');

		
	}]);
};