'use strict';

angular.module('schedulerApp')
    .controller('calendarCtrl', function calendarCtrl($rootScope, $scope, $location, $mdSidenav, eventService, roomService, helper, socket) {
    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 640,
            timezone: "local",
            minTime: "09:00:00",
            maxTime: "21:00:00",
            eventStartEditable: true,
            eventDurationEditable: false,
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
                eventService.showNewEvent(jsEvent, clickedMoment, $scope.rooms, HandleNewEventCallback);
            },
            eventClick: function (calEvent, jsEvent, view) {
                eventService.showExistingEvent(calEvent, $scope.rooms, HandleNewEventCallback);
            },
            eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) { 
                event.start = JSON.stringify(event.start);
                event.end = JSON.stringify(event.end);
                eventService.update(event);
            }
        }
    };

    function HandleNewEventCallback(status) {
        if (status && status == "Save") {
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

    function LoadRooms() {
        roomService.getAll()
      .success(function (rooms, status, headers, config) {
            $scope.rooms.length = 0;
            for (var index = 0; index < rooms.length; index++) {
                rooms[index].shown = true;
                $scope.rooms.push(rooms[index]);
            }
        })
      .error(function (data, status, headers, config) {
            helper.ShowErrorToast(data);
        });
    }

    function AddEventToScope(event) {
        event.start = helper.StringToDate(JSON.parse(event.start));
        event.end = helper.StringToDate(JSON.parse(event.end));
        event.color = event.room.color;
        event.stick = true;
        $scope.events.push(event);
    }

    function RemoveEventFromScope(event) {
      var indexToRemove;
      for (var index = 0; index < $scope.events.length; index++) {
                if ($scope.events[index]._id == event._id) {
                    indexToRemove = index;
                    break;
                }
      }
      $scope.events.splice(indexToRemove, 1);
    }

    $scope.events = [];
    $scope.rooms = [];
    $scope.init = function (){
        LoadEvents();
        LoadRooms();
    };

    $scope.eventSource = [$scope.events];

    socket.on('newEvent', function (data) {
      $rootScope.$apply(function () {AddEventToScope(data);});
    });

    socket.on('updatedEvent', function (data) {
      $rootScope.$apply(function () {RemoveEventFromScope(data);});
      $rootScope.$apply(function () {AddEventToScope(data);});
    });

    $scope.$on('$destroy', function (event) {
      socket.removeAllListeners();
      // or something like
      // socket.removeListener(this);
    });
    
    $scope.hideLeftSidebar = function(){
       $mdSidenav('left').close();
    };
    
    $scope.showLeftSidebar = function(){
       $mdSidenav('left').open();
    };
  });