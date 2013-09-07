'use strict';


// Declare app level module which depends on filters, and services
angular.module('flavrl', ['flavrl.filters', 'flavrl.services', 'flavrl.directives']).
  config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'flavrl.html' });
    $routeProvider.when('/:name', { templateUrl: 'app/base.html', controller: PagesController ,resolve: PagesController.resolve});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);