module.exports = function(app) {
	app.controller('searchCtrl', ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {

		$scope.tabs = [];
		$scope.searchText = '';
		$scope.sortType = 'artist';
		$scope.sortAsc = true;

		// Thanks, underscore!
		$scope.debounce = function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};

    $scope.getSearchResults = function() {
      $location.path('/search');
			$http.get('/api/tab/search/' + $scope.searchText)
      .then(function(res) {
        $scope.tabs = res.data;
      }, function(err) {
        console.log(err);
      });
    }

		$scope.search = $scope.debounce(function() {
      if($scope.searchText) {
        $scope.getSearchResults();
      }
		}, 600);

    $scope.radioChange = function() {
      if($scope.searchText) {
        $scope.getSearchResults();
      }
    }

		$scope.sort = function(type) {
			$scope.sortType = type;
			$scope.sortAsc = !$scope.sortAsc;
		}
	}]);
};
