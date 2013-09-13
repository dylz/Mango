/*Controllers */

/* Page status depending on app */
function pageStatus($scope,$http,$location){
	
	$scope.appInfo = [];

	$scope.loadAppInfo = function(data,status){
		$scope.appInfo = data;
	}

	$scope.fetch = function(){
		$http.get($scope.appJSON).success(function(data, status, headers, config){
			$scope.loadAppInfo(data,status);
			$scope.tabSwitchFocus();
		});
	}

	$scope.replaceWhitespace = function(item){
		return item.replace(' ','-');
	}

	$scope.tabSwitchFocus = function(){
		setTimeout(function(){
			$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				$('#views > div:first .focus').focus();
			});
		},1000);
	}

	$scope.$on('updatePage', function() {
		$scope.loc = $location.path();
		$scope.appJSON = 'app'+$scope.loc+'/manifest.json';
		if(($scope.loc != '') && ($scope.loc != '/')){
			$scope.loc = $scope.loc.substring(1);
			$scope.appJSON = 'app/'+$scope.loc+'/manifest.json';
		}
		else{
			$scope.appJSON = 'manifest.json';
		}
		$scope.fetch();
	});
}

/*Load the Users info */
function userInfo($scope,$http,$location){
	$scope.userJSON = 'json/user.json';
	$scope.userInfo = [];

	$scope.loadUserInfo = function(data,status){
		$scope.userInfo = data;
	}

	$scope.fetch = function(){
		$http.get($scope.userJSON).success($scope.loadUserInfo);
	}

	$scope.currentAppCheck = function(app){
		$scope.currentApp = $location.path().substring(1);
		if($scope.currentApp != app){
			return true;
		}
		else{
			return false;
		}
	}
	$scope.fetch();
}

/* Page Controllers For routing */
function PagesController($scope, $http, $route, $routeParams, $compile) {

  if($routeParams.name !== undefined){
  	$route.current.templateUrl = 'app/' + $routeParams.name + '/index.html';
  	$.getScript('app/'+$routeParams.name+'/controllers.js',function(){
  		$http.get($route.current.templateUrl).then(function (msg) {
    		$('#views').html($compile(msg.data)($scope));
    		$scope.$emit('updatePage');
    		$('#views > div:first .focus').focus();

  		});
  	});
  }
  else{
  	$scope.$emit('updatePage');
  }
}
PagesController.$inject = ['$scope', '$http', '$route', '$routeParams', '$compile'];
