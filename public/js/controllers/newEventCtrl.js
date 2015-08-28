'use strict';

angular.module('schedulerApp')
    .controller('newEventCtrl', function newEventCtrl($scope, $location, $mdDialog, eventService, helper, startMoment, calEvent, rooms) {
    $scope.newEvent = {};
    $scope.rooms = rooms;
    $scope.searchText = "";

    if (startMoment) {
        $scope.newEvent = {
            _id: "",
            title: "",
            startDate: startMoment.toDate(),
            startTime: startMoment.toDate(),
            owner: "",
        };
    }
    else if (calEvent) {
        $scope.newEvent = {
            _id: calEvent._id,
            title: calEvent.title,
            startDate: calEvent.start.toDate(),
            startTime: calEvent.start.toDate(),
            owner: calEvent.owner
        };
        $scope.selectedRoom = calEvent.room;
        $scope.searchText = calEvent.room.title;
    }

    $scope.closeDialog = function () {
        $mdDialog.hide("Cancel");
    };

    $scope.save = function () {
        $scope.newEvent.startDate.setHours($scope.newEvent.startTime.getHours());
        $scope.newEvent.startDate.setMinutes($scope.newEvent.startTime.getMinutes());
        var event = {
            _id: $scope.newEvent._id,
            title: $scope.newEvent.title,
            start: JSON.stringify($scope.newEvent.startDate),
            end: JSON.stringify(new Date($scope.newEvent.startDate.setMinutes($scope.newEvent.startDate.getMinutes() + 60))),
            owner: $scope.newEvent.owner,
            room: $scope.selectedRoom._id
        };
        if ($scope.newEvent._id){
            eventService.update(event)
                .success(function (data, status, headers, config) {
                    $mdDialog.hide("Save");
                })
                .error(function (data, status, headers, config) {
                    $mdDialog.hide("Error");
                    helper.ShowErrorToast(data);
                });
        }
        else{
            eventService.add(event)
                .success(function (data, status, headers, config) {
                    $mdDialog.hide("Save");
                })
                .error(function (data, status, headers, config) {
                    $mdDialog.hide("Error");
                    helper.ShowErrorToast(data);
                });            
        }

    };

    $scope.querySearch = function (query) {
        var results = query ? $scope.rooms.filter(createFilterFor(query)) : $scope.rooms;
        return results;
    };
    
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(room) {
            return (room.title.indexOf(lowercaseQuery) === 0);
        };
    }
});