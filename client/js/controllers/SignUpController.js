app.controller('SignUpController',function($scope){
	$scope.message = 'Hello from SignUpController';

	$routeParams ==> {page:'1', conId:'2'}

	$scope.convention = {
      "name": "string",
	  "time": "string",
	  "location": "string",
	  "description": "string",
	  "date": "string"
    };
});