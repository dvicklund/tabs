module.exports = function(app) {
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html',
      controller: 'tabCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'authCtrl'
    })
    .when('/submit', {
      templateUrl: 'templates/newTab.html',
      controller: 'tabCtrl'
    })
    .when('/popular', {
      templateUrl: 'templates/popular.html',
      controller: 'tabCtrl'
    })
    .when('/profile', {
      templateUrl: 'templates/profile.html',
      controller: 'authCtrl'
    })
    .when('/tab/:id', {
      templateUrl: 'templates/tabView.html',
      controller: 'tabCtrl'
    })
  }])
}
