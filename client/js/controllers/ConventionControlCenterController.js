app.controller('ConventionControlCenterController', function($scope,$http,$mdDialog){

	$http.get("/api/conventions")
  .then(function(response) {
      $scope.subCons = [];
      $scope.conventions = response.data;
      $scope.statuscode = response.status;
      $scope.statustext = response.statusText;
      console.log($scope.conventions);
      for(con in $scope.conventions){
        $http.get(`/api/conventions/${$scope.conventions[con].id}/subConventions`)
        .then(function(response) {
            
            $scope.subCons[$scope.conventions[con].id] = response.data;
            $scope.statuscode = response.status;
            $scope.statustext = response.statusText; 
        });
      }
      console.log($scope.subCons);
  });

    $scope.collapse = [];
	$scope.toggle = function(name){
		$scope.collapse[name] = !($scope.collapse[name]);
	};
	$scope.toggleCollapse = true;



	$scope.toggleCon = function(){
		$scope.toggleNewConvention = !($scope.toggleNewConvention);
	};
	$scope.toggleNewConvention = false;

	$scope.convention = {
      "name": undefined,
  	  "time": undefined,
  	  "location": undefined,
  	  "description": undefined,
  	  "date": undefined,
      "registrantIds":[]
    };

    $scope.getSubCons = function(conID){
        $http.get(`/api/conventions/${conID}/subConventions`)
        .then(function(response) {
            $scope.subCon[conID] = response.data;
            $scope.statuscode = response.status;
            $scope.statustext = response.statusText; 
        });
    };


    $scope.post = function(){
    	$scope.res = $http.post('/api/conventions', $scope.convention);
    	location.reload();
	 };

  $scope.showConfirmCon = function(ev,conID) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete:')
          .textContent('Convention')
          .ariaLabel('Delete SubConvention')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http.delete(`/api/conventions/${conID}`)
      .then(function(response) {
          $scope.conventions = response.data;
          $scope.statuscode = response.status;
          $scope.statustext = response.statusText; 
      });
      location.reload();
    }, function() {
      /// Do Nothing.
    });
  };

  $scope.showConfirmSubCon = function(ev,subConID) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete:')
          .textContent('Sub Convention')
          .ariaLabel('Delete SubConvention')
          .targetEvent(ev)
          .ok('Confirm')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      $http.delete(`/api/subConventions/${subConID}`)
      .then(function(response) {
          $scope.conventions = response.data;
          $scope.statuscode = response.status;
          $scope.statustext = response.statusText; 
      });
      location.reload();
    }, function() {
      /// Do Nothing.
    });
  };

	$scope.showAdvanced = function(ev,conID) {
    $mdDialog.show({
      locals: {conID:conID},
      controller: DialogController,
      templateUrl: 'views/subConDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
        location.reload();
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  function DialogController($scope, $mdDialog,$http,conID) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      if(answer){
        $scope.post();
      }

      $mdDialog.hide(answer);
    };

    $scope.post = function(){
        $scope.res = $http.post('/api/subConventions', $scope.newSubCon);

    };

    $scope.newSubCon = {
      name: undefined,
      leader: undefined,
      time: undefined,
      location: undefined,
      date: "Same as Convention",
      description: undefined,
      conventionId: conID,
      registrantIds: []
    };

    $scope.testCase[0] = [{"name":"hi"},{"name":"bye"}]; 


    $scope.subCons[0] = [
  {
    "name": "SubCon1",
    "time": "string",
    "leader": "string",
    "location": "string",
    "date": "string",
    "description": "string",
    "id": "5a26dacb98af47009c8f32d8",
    "conventionId": "5a2624b68e1a7b006c6d24cf",
    "registrantIds": [
      "string"
    ]
  },
  {
    "name": "SubCon2",
    "time": "string",
    "leader": "string",
    "location": "string",
    "date": "string",
    "description": "string",
    "id": "5a26dad498af47009c8f32d9",
    "conventionId": "5a2624b68e1a7b006c6d24cf",
    "registrantIds": [
      "string"
    ]
  },
  {
    "name": "Simple Sub Con",
    "time": "string",
    "leader": "string",
    "location": "string",
    "date": "string",
    "description": "string",
    "id": "5a26dadd98af47009c8f32da",
    "conventionId": "5a2624b68e1a7b006c6d24cf",
    "registrantIds": [
      "string"
    ]
  }];


  }

});