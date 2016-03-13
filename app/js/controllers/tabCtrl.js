module.exports = function(app) {
	app.controller('tabCtrl', ['$scope', 'crudResource', '$http', function($scope, $crudResource, $http) {
		var tabCrud = $crudResource('tab');

		$scope.tabs = [];
		$scope.newTab = {};

		$scope.getPopularTabs = function() {
			$http.get('/api/tabs/popular')
			.then(function(res) {
				console.log(res.data);
			})
		}

		$scope.submitNew = function(newTab) {

			$http.post('/api/tab', newTab)
			.then(function(res) {
				console.log(res.data);
			}, function(err) {
				console.log(err);
			})
		}

	}]);
};
