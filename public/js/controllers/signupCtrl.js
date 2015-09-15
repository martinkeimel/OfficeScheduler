'use strict';
angular.module('schedulerApp').directive('valueShouldMatch', function ($parse){ 
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ctrl) {
            var fieldToMatch = $parse(attr.valueShouldMatch);

            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function(value) {
                // test and set the validity after update.
                var valid = value == fieldToMatch(scope);
                ctrl.$setValidity('valueShouldMatch', valid);
                
                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                return valid ? value : undefined;
            });
            
            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function(value) {
                // validate.
                ctrl.$setValidity('valueShouldMatch', value == fieldToMatch(scope));
                
                // return the value or nothing will be written to the DOM.
                return value;
            });
      }
   };
});

angular.module('schedulerApp')
    .controller('signupCtrl', function signupCtrl($scope, $rootScope, $location, authService, helper){
		
	$scope.signup = function(){
        var userToAdd = {
            name: $scope.newUser.name,
            username: $scope.newUser.username,
            password: $scope.newUser.password
        };
        
        authService.addUser(userToAdd)
            .success(function (data, status, headers, config) {
                helper.ShowSuccessToast("El usuario se ha agregado exitosamente");
                $location.url('/login');
            })
            .error(function (data, status, headers, config) {
                helper.ShowErrorToast(data);
            });
	};
});

