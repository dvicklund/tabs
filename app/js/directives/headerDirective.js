module.exports = function(app) {
  app.directive('header', function() {
    return {
      restrict: 'AC',
      replace: false,
      templateUrl: 'templates/header.html'
    };
  });
};
