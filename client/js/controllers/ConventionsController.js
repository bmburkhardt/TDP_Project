app.controller('ConventionsController',function($scope){
	$scope.message = 'Hello from ConventionsController';
	$scope.conventions = [{
		name : "First Convention",
		location : "here",
		description : "short Discription\<br\> With second line",
		image: "/assets/convention.jpg"
	},{
		name : "Second Convention",
		location : "There",
		description : "short Discription\<br\> With second line\<br\> and a third",
		image: "/assets/convention.jpg"
	}];
	$scope.data = [ "Item 1", "Item 2", "Item 3", "Item 4"];
	$scope.toggle = {};
});