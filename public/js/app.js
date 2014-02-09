'use strict';


// Declare app level module which depends on filters, and services
angular.module('ed.web', ['ngRoute','ngResource','ngTouch']).
  config(['$locationProvider','$routeProvider', function($locationProvider,$route) {
  	$route.when('/blog',{
  		template:'<div>Blog</div>'
  	})
  	.when('/work',{
  		template:'<div>Work</div>'
  	})
  	.when('/play',{
  		template:'<div>Play</div>'
  	})
  	.when('/',{
  		templateUrl:'partials/home',
  		controller:function($scope){
  			$scope.tools.open = false;
  		}
  	}).otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}])

// Logo Directive
.directive('edLogo', [function(){
	var dir = {};
	dir.restrict = 'E';
	dir.template = '<div ng-style="style" class="logo">{<span>e</span>}</div>';
	dir.scope = {
		size:'@?'
	};
	dir.link = function(scope) {
		scope.style = {};
		if (scope.size)
			scope.style['font-size'] = scope.size + 'px';
	};

	return dir;
}])

.run(['$rootScope','$location',function($root,$loc){
	$root.location = $loc;
	var tools = {};
	tools.open = true;
	$root.tools = tools;
}])