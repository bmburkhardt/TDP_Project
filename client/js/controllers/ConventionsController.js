app.controller('ConventionsController',function($scope){
	$scope.message = 'Hello from ConventionsController';
	$scope.conventions = [{
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
	$scope.data = [ "Item 1", "Item 2", "Item 3", "Item 4"];
	$scope.collapse = [];
	$scope.toggle = function(name){
		$scope.collapse[name] = !($scope.collapse[name]);
	};
	$scope.toggleCollapse = true;
});