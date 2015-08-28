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
	
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, authService){
    	// Initialize a new promise 
    	var deferred = $q.defer(); 
    	
    	// Make an AJAX call to check if the user is logged in 
    	authService.isLoggedIn().success(function(user){ 
    		// Authenticated 
    		if (user !== '0') {
                $rootScope.isLogged = true;
    			deferred.resolve();
            } 
    		// Not Authenticated 
    		else { 
    			$rootScope.message = 'You need to log in.'; 
    			deferred.reject(); 
    			$location.url('/login'); 
    		} 
    	}); 
    	
    	return deferred.promise; 
    };
    
    $routeProvider    
        .when('/', 
            {
            controller: 'calendarCtrl',
            templateUrl: 'views/calendar.html',
            resolve: { loggedin: checkLoggedin }
            })
         .when('/login', 
	       {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
           })
         .when('/signup', 
	       {
            templateUrl: 'views/signup.html',
            controller: 'signupCtrl'
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

