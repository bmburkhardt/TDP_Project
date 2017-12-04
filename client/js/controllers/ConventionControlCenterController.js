app.controller('ConventionControlCenterController', function($scope,$http,$mdDialog){

	$http.get("/api/conventions")
    .then(function(response) {
        $scope.conventions = response.data;
        $scope.statuscode = response.status;
        $scope.statustext = response.statusText; 
    });

    $scope.collapse = [];
	$scope.toggle = function(name){
		$scope.collapse[name] = !($scope.collapse[name]);
	};
	$scope.toggleCollapse = true;


	$scope.delete = function(id){
		$http.delete(`/api/conventions/${id}`)
	    .then(function(response) {
	        $scope.conventions = response.data;
	        $scope.statuscode = response.status;
	        $scope.statustext = response.statusText; 
	    });
	    location.reload();
	};
	$scope.toggleCon = function(){
		$scope.toggleNewConvention = !($scope.toggleNewConvention);
	};
	$scope.toggleNewConvention = false;

	$scope.convention = {
      "name": undefined,
	  "time": undefined,
	  "location": undefined,
	  "description": undefined,
	  "date": undefined
    };



    $scope.post = function(){
    	$scope.res = $http.post('/api/conventions', $scope.convention);
    	location.reload();
	};



	$scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/subConDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

});