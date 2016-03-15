module.exports = function(app) {
	app.controller('tabCtrl', ['$scope',  '$http', '$location', '$route', function($scope, $http, $location, $route) {

		$scope.tab = {};
		$scope.tabs = [];
		$scope.newTab = {};
		$scope.loading = true;

		$scope.getPopularTabs = function() {
			$scope.loading = true;
			$http.get('/api/tabs/popular')
			.then(function(res) {
				$scope.loading = false;
				$scope.tabs = res.data;
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

		// TODO: I don't like the multiple ajax requests here - fix it
		$scope.getTab = function() {
			var tabId = $route.current.params.id;
			$http.get('/api/tab/' + tabId)
			.then(function(res) {
				$http.patch('/api/tab/view/' + tabId)
				.then(function(res) {
					$scope.tab = res.data;
					$scope.tab.date = new Date($scope.tab.dateCreated).toLocaleDateString();
				}, function(err) {
					console.log(err)
				})
			}, function(err) {
				console.log(err);
			})
		}
	}]);
};
