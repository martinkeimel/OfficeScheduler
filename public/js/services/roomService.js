'use strict';

/* eventService */
angular.module('schedulerApp').service('roomService', function ($http, $location) {
    //return the array
    this.getAll = function () {
        return $http.get('/api/rooms');
    }
});