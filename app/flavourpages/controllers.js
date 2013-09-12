/*Controller*/
function fpControl($scope){
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

	$scope.changeInputView = function(item){
		$scope.inputData.type = item.type;
		$scope.inputData.placeholder = item.text;
		$scope.inputData.icon = item.icon;
		$scope.inputData.goIcon = item.go;
		$('#app-flavourpages .focus').focus();
	}

	$scope.goBtn = function(){
		$scope.type = $scope.inputData.type;

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
}