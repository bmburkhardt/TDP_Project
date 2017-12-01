app.controller('SignUpController',function($scope){
	$scope.message = 'Hello from SignUpController';

	$scope.user = {
      name: 'John Doe',
      email: '',
      phone: '',
      address: 'Mountain View, CA',
      donation: 19.99
    };
});