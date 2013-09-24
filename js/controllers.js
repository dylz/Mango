/*Controllers */

/* Page status depending on app */
function pageStatus($scope,$http,$location,shareTab){
	$scope.service = shareTab;
	$scope.appInfo = [];
	
	$scope.$watch('service.retrieveTab()', function(data) {
    	if((data != '') && (data != undefined)){
    		split = data.split(';');
    		tab = split[0];
    		section = split[1];
    		sectionLen = $scope.countTabLen(section);
    		console.log({"section":section, "order": sectionLen, "header":false ,"name":tab,"id":99})
    		$scope.appInfo.sidebar.push({"section":parseInt(section), "order": sectionLen, "header":false ,"name":tab,"id":99});
    		$scope.setSort();
    	}
	});

	$scope.setSort = function(){
		$scope.tabSort = ['section','order'];
	}

	$scope.loadAppInfo = function(data,status){
		$scope.appInfo = data;
	}

	$scope.fetch = function(){
		$http.get($scope.appJSON).success(function(data, status, headers, config){
			$scope.loadAppInfo(data,status);
			$scope.tabSwitchFocus();
		});
	}

	$scope.countTabLen = function(section){
		a = $scope.appInfo.sidebar;
		result = 0;
		for(i = 0; i < a.length; ++i) {
		    if(a[i].section == section){
		    	result++;
		    }
		}
		return result;
	}

	$scope.replaceWhitespace = function(item){
		return item.replace(' ','-');
	}

	$scope.determineClass = function(tab){
		if(tab.id == $scope.appInfo.activeTab){
			return 'active';
		}
		else if(tab.header){
			return 'nav-header';
		}
	}

	$scope.tabSwitch = function(tab){
		$scope.appInfo.activeTab = tab.id
		shareTab.setTab(tab);
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

	$scope.$on('brandUpdate', function() {
		$scope.appInfo.brand = 'Flavrl';
	});
}

/*Load the Users info */
function userInfo($scope,$http,$location){
	$scope.userJSON = 'json/user.json';
	$scope.userInfo = [];

	$scope.loadUserInfo = function(data,status){
		if(data.loggedIn){
			$scope.userInfo = data;
			if($location.path()=='/login'){
				$location.path('/');
			}
		}
		else{
			$scope.notLoggedIn();
		}
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

	$scope.notLoggedIn = function(){
		$location.path('/login');
		$scope.$emit('brandUpdate');
	}

	$scope.fetch();
}

/* Page Controllers For routing */
function PagesController($scope, $http, $route, $routeParams, $compile,$location) {
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
