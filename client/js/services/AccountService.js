

app.factory('AccountService', ['$http', function($http) { 
  	this.token = "";
	this.username = "default";

	this.verified = true;

	this.isVerified = function(){
		this.verified = !this.verified();
	}

	this.login = function(){
		if(true){
			this.isVerified();
		}else{
			window.alert("Not Verified");
		}
	};

}]);


