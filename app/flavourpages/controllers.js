/*Controller*/
function fpControl($scope,$http,$timeout,shareTab){

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

    $scope.colourSetOne = ["FF0000", "FF7F00", "0772A1", "133AAC"];
    $scope.colourSetTwo = ["00CC00", "007536", "4711AE", "8807BA"];
    $scope.colourSetThree = ["828282","000000","B50000","17CED1"];

    $scope.selected = '';
    $scope.colour = '';
    $scope.customColour = '';
    $scope.customClass = '';

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

	$scope.modalEvent = $timeout(function(){
		$('#fp-modal').on('hidden.bs.modal', function () {
		  	$scope.selected = '';
		    $scope.colour = '';
    		$scope.customColour = '';
		    $scope.customClass = '';
		});
	},1000);

	$scope.setColour = function(colour,item){
		$scope.colour = colour;
		$scope.selected = item;

		if(item == 'Custom'){
    		$scope.customColour = colour;
			$scope.customClass = 'btn-colour';
		}
	}

	$scope.colourClass = function(item){
		if($scope.selected == item){
			return "selected";
		}
	}

	$scope.setEditModal = function(item){
		$scope.editItem = item;
		$scope.editUrl = item.url;
		$scope.editName = item.name;
		$scope.editBC = item.borderColor;
	}

	$scope.saveLink = function(ename,eurl,eBC){
		var r = $scope.getObject();
		r.name = ename;
		r.url = eurl;
		r.borderColor = eBC;
		$('#fp-modal').modal('hide');
	}

	$scope.archiveLink = function(){
		var r = $scope.getObject(),
		index = $scope.tabData.content.indexOf(r);
		$scope.tabData.content.splice(index,1);
	}

	$scope.getObject = function(){
		var edit = $scope.editItem;
		var result = $scope.tabData.content.filter(function( obj ) {
  			return obj.id == edit.id;
		});
		return result[0];
	}

	$scope.filterThumbs = function(input){
		$scope.filterThumb = input;
	}

	$scope.replaceWhitespace = function(item){
		return item.replace(' ','-');
	}

	$scope.changeInputView = function(item){
		console.log(item)
		$scope.inputData.type = item.type;
		$scope.inputData.placeholder = item.text;
		$scope.inputData.icon = item.icon;
		$scope.inputData.goIcon = item.go;
		$('#app-flavourpages .focus').focus();
	}

	$scope.goBtn = function(input){
		$scope.type = $scope.inputData.type;
		switch($scope.type){
			case "link":{
				console.log("A link will be added")
			}
			break;
			case "tab":{
				shareTab.queueTab(input,2);
			}
			break;
			case "search":{
				$scope.filterThumbs(input);
			}
			break;
		}
		$scope.input = '';
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
