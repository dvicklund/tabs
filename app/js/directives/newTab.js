module.exports = function(app) {
  app.directive('newTab', function() {
    return {
      restrict: 'AC',
      replace: false,
      templateUrl: 'templates/newTab.html'
    };
  });
};
