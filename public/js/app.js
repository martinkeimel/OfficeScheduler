'use strict';

// Declare app level module
angular.module('schedulerApp', ['ui.calendar', 'ngMaterial', 'ngRoute'])
	   .config(function($mdThemingProvider, $mdIconProvider, $routeProvider, $httpProvider){

    $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu"       , "./assets/svg/menu.svg"        , 24)
        .icon("add"       , "./assets/svg/add.svg"        , 48);

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
	
    $routeProvider    
        .when('/', 
            {
            controller: 'calendarCtrl',
            templateUrl: 'views/calendar.html'
            })
         .when('/login', 
	       {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
           })
        .otherwise({redirectTo: '/'});
        
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function ($q,$location, $rootScope) {
        return {
            'responseError': function (rejection) {
                if(rejection.status === 401) {
                    $rootScope.message = 'Authentication failed.';
                    $rootScope.isLogged = false;
                    $location.url('/login');
                }
                return $q.reject(rejection);
            }
        };
    });
});

