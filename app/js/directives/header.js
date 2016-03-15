module.exports = function(app) {
  app.directive('header', function() {
    return {
      restrict: 'AC',
      replace: false,
      controller: 'searchCtrl',
      templateUrl: 'templates/header.html'
    };
  });
};
