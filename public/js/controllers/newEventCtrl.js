'use strict';

angular.module('schedulerApp')
    .controller('newEventCtrl', function newEventCtrl($scope, $location, $mdDialog, eventService, helper) {
    $scope.event = {
        _id: String,
        title: "sarasa",
        start: $scope.date,
        end: $scope.date,
        owner: "mk",
    };

    $scope.closeDialog = function () {
        $mdDialog.hide();
    };

    $scope.save = function () {
        eventService.update($scope.event)
            .success(function (data, status, headers, config) {
            $mdDialog.hide();
        })
            .error(function (data, status, headers, config) {
            $mdDialog.hide();
            //toaster.pop('error', current);
        });

    };
});