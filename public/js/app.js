'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute','ngResource']).
  config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}])

.run(['$rootScope', function($root){
	$root.dude = 'hey';
}])