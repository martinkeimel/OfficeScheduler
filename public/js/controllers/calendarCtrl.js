'use strict';

angular.module('schedulerApp')
    .controller('calendarCtrl', function calendarCtrl($scope, $location, eventService, helper) {
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 640,
            timezone: "local",
            minTime: "09:00:00",
            maxTime: "21:00:00",
            editable: true,
            defaultView: 'agendaWeek',
            header: {
                left: 'agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            slotEventOverlap: false,
            //slotDuration: "01:00:00",
            weekends: false,
            dayClick: function (clickedMoment, jsEvent, view) {
                eventService.showNewEvent(jsEvent, clickedMoment, HandleNewEventCallback);
            },
            eventClick: function (calEvent, jsEvent, view) {
                eventService.showExistingEvent(calEvent);
            }
        }
    };
    
    function HandleNewEventCallback(status){
        if (status && status == "Save"){
            LoadEvents();
        }
    }
    
    function LoadEvents() {
        eventService.getAll()
        .success(function (events, status, headers, config) {
            for (var index = 0; index < events.length; index++) {
                events[index].start = helper.StringToDate(JSON.parse(events[index].start));
                events[index].end = helper.StringToDate(JSON.parse(events[index].end));
                $scope.events.push(events[index]);
            }
        })
        .error(function (data, status, headers, config) {
            //toaster.pop('error', current);
        });
    }

    $scope.events = [];
    LoadEvents();
    $scope.eventSource = [$scope.events];
});