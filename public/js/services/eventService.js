'use strict';

/* eventService */
angular.module('schedulerApp').service('eventService', function ($http, $location, $mdDialog) {
    //return the array
    this.getAll = function () {
        return $http.get('/api/events');
    }
       
    //search by id in the current array
    this.getById = function (blogItemId) {
        return $http.get('/api/events' + blogItemId);
    };
    
    //add a new element to array
    this.update = function (postData) {
        return $http.post('/api/events/update', postData);
    };

    this.showNewEvent = function ($clickEvent, date) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $clickEvent,
            templateUrl: '../views/newEvent.html',
            locals: {
                date: date
            }
        });
    }

}); 
