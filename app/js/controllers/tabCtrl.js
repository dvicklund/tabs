module.exports = function(app) {
	app.controller('tabCtrl', ['$scope', 'crudResource', '$http', '$location', function($scope, $crudResource, $http, $location) {
		var tabCrud = $crudResource('tab');

		$scope.tab = {};
		$scope.tabs = [];
		$scope.newTab = {};

		$scope.getPopularTabs = function() {
			$http.get('/api/tabs/popular')
			.then(function(res) {
				$scope.tabs = res.data;
				console.log(res.data);
			})
		}

		$scope.submitNew = function(newTab) {
			$http.post('/api/tab', newTab)
			.then(function(res) {
				newTab = {};
				$location.path('/tab/' + res.data._id);
			}, function(err) {
				console.log(err);
			})
		}

		$scope.getTab = function() {
			var tabId = $location.path().split('/')[2]
			$http.get('/api/tab/' + tabId)
			.then(function(res) {
				$scope.tab = res.data[0];
			}, function(err) {
				console.log(err);
			})
		}

		$scope.getByArtist = function() {

		}
	}]);
};
