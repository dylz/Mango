/*Controllers */

/*Load the Users info */
function userInfo($scope,$http){
	$scope.userJSON = 'json/user.json';
	$scope.userInfo = [];

	$scope.loadUserInfo = function(data,status){
		$scope.userInfo = data;
	}

	$scope.fetch = function(){
		$http.get($scope.userJSON).success($scope.loadUserInfo);
	}

	$scope.fetch();
}

/* Page Controllers For routing */
function PagesController($scope, $http, $route, $routeParams, $compile) {
  $route.current.templateUrl = 'app/' + $routeParams.name + '/index.html';
  
  $http.get($route.current.templateUrl).then(function (msg) {
    $('#views').html($compile(msg.data)($scope));
  });
}
PagesController.$inject = ['$scope', '$http', '$route', '$routeParams', '$compile'];