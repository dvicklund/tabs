module.exports = function(app) {
  app.directive('popular', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/popular.html'
    };
  });
};
