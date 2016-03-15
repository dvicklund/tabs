require('angular/angular');
require('angular-route');
var angular = window.angular;

var tabApp = angular.module('TabApp', ['ngRoute']);
require('./controllers')(tabApp);
require('./directives')(tabApp);
require('./router')(tabApp);
