'use strict';

/* eventService */
angular.module('schedulerApp').service('authService', function ($http) {
    //return the array
    this.login = function (user) {
        return $http.post('/api/user/login', user);
    };
    
    this.logout = function () {
        return $http.post('/api/user/logout');
    };
    
    this.isLoggedIn = function () {
        return $http.get('/api/user/loggedin');
    };    
    
    this.addUser = function (user) {
        return $http.post('/api/user/add', user);
    };
});