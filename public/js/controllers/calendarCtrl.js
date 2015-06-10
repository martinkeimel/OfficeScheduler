'use strict';

angular.module('schedulerApp')
    .controller('calendarCtrl', function calendarCtrl($scope, $location, eventService, helper, socket) {
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
                eventService.showExistingEvent(calEvent, HandleNewEventCallback);
            }
        }
    };
    
    function HandleNewEventCallback(status){
        if (status && status == "Save"){
            helper.ShowSuccessToast("El evento se ha agregado/modificado exitosamente");
        }
    }
    
    function LoadEvents() {
        eventService.getAll()
        .success(function (events, status, headers, config) {
            for (var index = 0; index < events.length; index++) {
                AddEventToScope(events[index]);
            }
        })
        .error(function (data, status, headers, config) {
            helper.ShowErrorToast(data);
        });
    }
    
    function AddEventToScope(event){
        event.start = helper.StringToDate(JSON.parse(event.start));
        event.end = helper.StringToDate(JSON.parse(event.end));
        $scope.events.push(event);
    }

    function RemoveEventFromScope(event){
        var indexToRemove;
        for (var index = 0; index <  $scope.events.length; index++) {
            if ($scope.events[index]._id == event._id) {
                indexToRemove = index;
                break;
            }   
        }
        $scope.events.splice(indexToRemove, 1);
    }
    
    $scope.events = [];
    LoadEvents();
    $scope.eventSource = [$scope.events];
    
    socket.on('newEvent', function (data){
        AddEventToScope(data);
    });
    
    socket.on('updatedEvent', function (data){
        RemoveEventFromScope(data);
        AddEventToScope(data);
    });
    
    $scope.$on('$destroy', function (event) {
        socket.removeAllListeners();
        // or something like
        // socket.removeListener(this);
    });
});