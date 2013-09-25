'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('flavrl', ['flavrl.filters', 'flavrl.services', 'flavrl.directives']);
app.config(['$routeProvider', function ($routeProvider) {
  	$routeProvider.when('/login',{templateUrl: 'login.html'});
    $routeProvider.when('/', { templateUrl: 'flavrl.html',controller: PagesController ,resolve: PagesController.resolve});
    $routeProvider.when('/:name', { templateUrl: 'app/base.html', controller: PagesController ,resolve: PagesController.resolve});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

app.run(function($rootScope, $window){
 $rootScope.windowWidth = $window.outerWidth;
 angular.element($window).bind('resize',function(){
  $rootScope.windowWidth = $window.outerWidth;
  $rootScope.$apply('windowWidth');
 });
})