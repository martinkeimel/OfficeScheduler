'use strict';

angular.module('schedulerApp')
    .controller('mainCtrl', function mainCtrl($rootScope, $scope, $mdSidenav, $location, authService) {
    
    $scope.hideLeftSidebar = function(){
       $mdSidenav('left').close();
    };
    
    $scope.showLeftSidebar = function(){
       $mdSidenav('left').open();
    };
    
    $scope.logout = function(){
        authService.logout()
        .success(function (events, status, headers, config) {
            $rootScope.message = 'Logged out';
            $rootScope.isLogged = false;
            $rootScope.user = null;
            $location.url('/login');
        });
    };
    
    $scope.isLogged = function(){
      return $rootScope.isLogged;
    };
  });