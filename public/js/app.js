'use strict';

// Declare app level module
angular.module('schedulerApp', ['ui.calendar', 'ngMaterial'])
	   .config(function($mdThemingProvider, $mdIconProvider){

	      $mdIconProvider
	          .defaultIconSet("./assets/svg/avatars.svg", 128)
	          .icon("menu"       , "./assets/svg/menu.svg"        , 24)
	          .icon("add"       , "./assets/svg/add.svg"        , 48);
	
	          $mdThemingProvider.theme('default')
	              .primaryPalette('blue')
	              .accentPalette('red');
	
	    });

