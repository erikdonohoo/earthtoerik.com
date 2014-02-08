'use strict';


// Declare app level module which depends on filters, and services
angular.module('ed.web', ['ngRoute','ngResource']).
  config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}])

// Logo Directive
.directive('edLogo', [function(){
	var dir = {};
	dir.restrict = 'E';
	dir.template = '<div ng-style="style" class="logo">{<span>e</span>}</div>';
	dir.scope = {
		size:'@'
	};
	dir.link = function(scope) {
		scope.style = {};
		scope.style['font-size'] = scope.size + 'px';
		console.log(scope.style);
	};

	return dir;
}]);