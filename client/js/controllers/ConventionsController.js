app.controller('ConventionsController',function($scope,$http,$mdDialog){
	$scope.message = 'Hello from ConventionsController';

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










/////////////////////////////////////////////////////////////////////////////
	$scope.showAdvanced = function(ev,conID) {
    $mdDialog.show({
      locals: {conID:conID},
      controller: DialogController,
      templateUrl: 'views/personDialog.html',
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
        $scope.res = $http.post(`/api/persons`, $scope.newPerson);
        $scope.newRegistrant.personId = $scope.res.id;
        $scope.res = $http.post(`/api/conventions/${conID}/registrantArr`, $scope.newRegistrant);
    };

    $scope.newPerson = {
	  firstName: undefined,
	  middleName: undefined,
	  lastName: undefined,
	  gender: undefined,
	  age: 0,
	  senateDistrictCounty: undefined,
	  email: undefined,
	  street: undefined,
	  city: undefined,
	  state: undefined,
	  zipcode: 0,
	  presidentialPref: undefined,
	  delegateType: undefined,
	  homePhone: undefined,
	  cellPhone: undefined,
	  phonePref: 0,
	  ethnicity: undefined,
	  lgbt: false,
	  veteran: false,
	  disabled: undefined,
	  caucusesAttending: undefined,
	  attendedCountyConvention: false,
	  registrantId: undefined
	};

	$scope.newRegistrant = {
		register: true,
		personId: undefined
	};

  $scope.genders = ["Male","Female"];

  }

////////////////////////////////////////////////////////////////////////////////////



});