'use strict';

/* eventService */
angular.module('schedulerApp').service('eventService', function ($http, $location, $mdDialog) {
    //return the array
    this.getAll = function () {
        return $http.get('/api/events');
    };
          
    //add a new event or modify it
    this.update = function (postData) {
        return $http.post('/api/events/update', postData);
    };

    this.showNewEvent = function ($clickEvent, clickedMoment, rooms, onSuccess) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            targetEvent: $clickEvent,
            controller: 'newEventCtrl',
            templateUrl: '../views/newEvent.html',
            locals: {
                startMoment: clickedMoment,
                calEvent: "",
                rooms: rooms
            }
        }).then(onSuccess);
    };

    this.showExistingEvent = function (calEvent, rooms, onSuccess) {
        var parentEl = angular.element(document.body);
        $mdDialog.show({
            parent: parentEl,
            controller: 'newEventCtrl',
            templateUrl: '../views/newEvent.html',
            locals: {
                startMoment: "",
                calEvent: calEvent,
                rooms: rooms
            }
        }).then(onSuccess);
    };
}); 
