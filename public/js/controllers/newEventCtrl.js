'use strict';

angular.module('schedulerApp')
    .controller('newEventCtrl', function newEventCtrl($scope, $location, $mdDialog, eventService, helper, startMoment, calEvent) {
    $scope.newEvent = {};
    if (startMoment) {
        $scope.newEvent = {
            _id: "",
            title: "sarasa",
            startDate: startMoment.toDate(),
            startTime: startMoment.toDate(),
            owner: "mk",
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
    }

    $scope.closeDialog = function () {
        $mdDialog.hide("Cancel");
    };

    $scope.save = function () {
        $scope.newEvent.startDate.setHours($scope.newEvent.startTime.getHours());
        var event = {
            _id: $scope.newEvent._id,
            title: $scope.newEvent.title,
            start: JSON.stringify($scope.newEvent.startDate),
            end: JSON.stringify(new Date($scope.newEvent.startDate.setMinutes($scope.newEvent.startDate.getMinutes() + 60))),
            owner: $scope.newEvent.owner,
        };
        //TODO: que se cierre la ventana
        eventService.update(event)
            .success(function (data, status, headers, config) {
            $mdDialog.hide("Save");
        })
      .error(function (data, status, headers, config) {
            $mdDialog.hide("Error");
            helper.ShowErrorToast(data);
        });

    };
});