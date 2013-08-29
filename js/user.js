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