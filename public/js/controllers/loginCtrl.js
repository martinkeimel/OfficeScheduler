'use strict';

angular.module('schedulerApp')
    .controller('loginCtrl', function loginCtrl($scope, $rootScope, $location, authService, helper){
		
	$scope.login = function(){
		authService.login($scope.user)
			.success(function(user){
        $rootScope.message = 'Authentication successful!';
        $rootScope.isLogged = true;
        $rootScope.user = $scope.user.username;
        $location.url('/');
        helper.CloseToast();
      })
      .error(function(){
        $rootScope.message = 'Authentication failed. Please, try again.';
        $rootScope.isLogged = false;
        $location.url('/login');
        helper.ShowErrorToast($rootScope.message);
      });
	};	
});