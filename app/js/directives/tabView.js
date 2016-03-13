module.exports = function(app) {
  app.directive('tabView', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/tabView.html'
    };
  });
};
