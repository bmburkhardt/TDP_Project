var app = angular.module('conventionApp',['ngRoute','ngMaterial']);

app.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl : 'views/home.html',
		controller  : 'HomeController'
	})

	.when('/conventions',{
		templateUrl : 'views/conventions.html',
		controller  : 'ConventionsController'
	})

	.when('/signup',{
		templateUrl : 'views/signUp.html',
		controller  : 'SignUpController'
	})

	.otherwise({redirectTo : '/'});
});