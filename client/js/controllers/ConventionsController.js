app.controller('ConventionsController',function($scope,$http){
	$scope.message = 'Hello from ConventionsController';
	$scope.conventionsOld = [{
		name : "First Convention",
		location : "here",
		description : "short Discription of a simple convention",
		image: "/assets/convention.jpg"
	},{
		name : "Second Convention",
		location : "There",
		description : "short Discription jfa lha difjlasiafln flasjdfisj la ldijfasld saljl laisdjfl asdiia ldfia sjflidsjf lakhsdila l",
		image: "/assets/convention.jpg"
	},{
		name : "Second Convention 2",
		location : "There",
		description : "short Discription jfa lha difjlasiafln flasjdfisj la ldijfasld saljl laisdjfl asdiia ldfia sjflidsjf lakhsdila l",
		image: "/assets/convention.jpg"
	}];

	$http.get("/api/conventions")
    .then(function(response) {
        $scope.conventions = response.data;
        $scope.statuscode = response.status;
        $scope.statustext = response.statusText; 
    });


	$scope.data = [ "Item 1", "Item 2", "Item 3", "Item 4"];
	$scope.collapse = [];
	$scope.toggle = function(name){
		$scope.collapse[name] = !($scope.collapse[name]);
	};
	$scope.toggleCollapse = true;
});