'use strict';

angular.module('schedulerApp')
    .controller('calendarCtrl', function calendarCtrl($scope, $location, eventService, helper) {
    /* config object */
    $scope.uiConfig = {
        calendar: {
            /*height: 450,*/
            editable: true,
            defaultView: 'agendaWeek',
            header: {
                left: 'agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            weekends: false,
            dayClick: function (date, jsEvent, view) {
                eventService.showNewEvent(jsEvent, date);
            },
            eventClick: function (calEvent, jsEvent, view) {
                eventService.showExistingEvent(calEvent);
            }
        }
    };

    $scope.events = [];

    eventService.getAll()
        .success(function (events, status, headers, config) {
        for (var index = 0; index < events.length; index++) {
            events[index].start = helper.StringToDate(events[index].start);
            events[index].end = helper.StringToDate(events[index].end);
            $scope.events.push(events[index]);
        }
    })
        .error(function (data, status, headers, config) {
        //toaster.pop('error', current);
    });

    $scope.addEvent = function () {
        $scope.events.push({
            title: 'Open Sesame',
            start: new Date()
        });
    };



    $scope.eventSource = [$scope.events];
});