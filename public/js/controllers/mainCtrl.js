'use strict';

angular.module('schedulerApp')
    .controller('mainCtrl', function mainCtrl($scope, $mdSidenav) {
    
    $scope.hideLeftSidebar = function(){
       $mdSidenav('left').close();
    };
    
    $scope.showLeftSidebar = function(){
       $mdSidenav('left').open();
    };
  });