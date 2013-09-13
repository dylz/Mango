/*Controller*/
function fpControl($scope,$http,shareTab){
	$scope.inputData = {
		type: "link",
		icon:"link",
		placeholder:"Add Link",
		goIcon:"plus",
		dropdown:[
			{type:"link",  text:"Add Link",icon:"link",   go:"plus"},
			{type:"tab",   text:"Add Tab", icon:"th-list",go:"plus"},
			{type:"search",text:"Search",  icon:"search", go:"search"}
		]
	};

    $scope.tabData = {
    	name:"Home",
    	divID:"Home",
    	id:6,
    	content:[]
    }

    $scope.tabContent = 'app/flavourpages/'+$scope.tabData.id+'.json';
    $scope.service = shareTab;

	$scope.$watch('service.getTab()', function(tab) {
    	if(tab.id !== undefined){
    		$scope.tabData = {
		    	name:tab.name,
		    	divID:$scope.replaceWhitespace(tab.name),
		    	id:tab.id,
		    	content:[]
    		}
    		$scope.tabContent = 'app/flavourpages/'+tab.id+'.json';
    		$scope.fetch();
    	}
	});

	$scope.replaceWhitespace = function(item){
		return item.replace(' ','-');
	}

	$scope.changeInputView = function(item){
		$scope.inputData.type = item.type;
		$scope.inputData.placeholder = item.text;
		$scope.inputData.icon = item.icon;
		$scope.inputData.goIcon = item.go;
		$('#app-flavourpages .focus').focus();
	}

	$scope.goBtn = function(){
		$scope.type = $scope.inputData.type;
		console.log(shareTab.getTab())
		switch($scope.type){
			case "link":{
				console.log("A link will be added")
			}
			break;
			case "tab":{
				console.log("A tab will be added NOW!")
			}
			break;
			case "search":{
				console.log("You are searching flavourpages vroom")
			}
			break;
		}
	}

	$scope.loadTabInfo = function(data,status){
		$scope.tabData.content = data;
	}

	$scope.fetch = function(){
		$http.get($scope.tabContent).success(function(data, status, headers, config){
			$scope.loadTabInfo(data,status);
		});
	}

	$scope.fetch();
}