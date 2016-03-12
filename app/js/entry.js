require('angular/angular');
require('angular-route');
var angular = window.angular;

var tabApp = angular.module('TabApp', ['ngRoute']);
require('./services')(tabApp);
require('./controllers')(tabApp);
require('./directives')(tabApp);

