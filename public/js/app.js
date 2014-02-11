

// Declare app level module which depends on filters, and services
angular.module('ed.web', ['ngRoute','ngResource','ngTouch','ngAnimate']).
  config(['$locationProvider','$routeProvider', function($locationProvider,$route) {
  	$route.when('/blog',{
  		templateUrl:'partials/blog',
  		controller:'BlogCtrl'
 	})
  	.when('/work',{
  		template:'<div>Work</div>'
  	})
  	.when('/play',{
  		template:'<div>Play</div>'
  	})
  	.when('/',{
  		templateUrl:'partials/home',
  		controller:function($scope, Nav){
  			Nav.open = false;
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

.directive('edShowWindow',['$window',function($window){
	var dir = {};
	dir.scope = {
		edShowWindow: '@'
	};
	dir.link = function(scope, elem) {

		scope.getPageWidth = function() {
			return $window.innerWidth;
		};

		$window.onresize = function() {
			scope.$apply(); // Tell angular about window size change
		};

		scope.$watch(scope.getPageWidth, function(newVal){
			if (newVal > scope.edShowWindow)
				elem.addClass('show-force');
			else
				elem.removeClass('show-force');
		});
	};
	return dir;
}])

.directive('edScroll', ['$window','$location','$anchorScroll', function($window,$location,$anchorScroll){
	var dir = {};
	dir.scope = {
		edScroll: '@'
	};
	dir.replace = true;
	dir.template = '<div class="ed-scroll ng-hide" ng-click="top()"><i class="fa fa-arrow-up fa-2x"></i></div>';
	dir.link = function(scope, elem) {

		scope.getScroll = function() {
			return $window.scrollY;
		};

		$window.onscroll = function() {
			scope.$apply(); // Tell angular about scrolling
		};

		scope.top = function() {
			$location.hash('top');
			$anchorScroll();
		};

		scope.$watch(scope.getScroll, function(newVal){
			console.log(newVal);
			if (newVal > scope.edScroll)
				elem.removeClass('ng-hide');
			else
				elem.addClass('ng-hide');
		});
	};

	return dir;
}])

.directive('edCode',['$timeout', function($timeout){
	var dir = {};
	dir.scope = {
		plunk: '@'
	};
	dir.restrict = 'E';
	dir.template = '<div class="ed-code clearfix"><pre class="prettyprint"></pre><a ng-href="{{plunk}}" target="_blank"><i class="code-link fa fa-toggle-down fa-2x" title="Try in Plnkr"></i></a></div>';
	dir.transclude = true;
	dir.link = function(scope, elem, attr, ctrl, transclude) {
		var code = angular.element('<div>').append(transclude());
		code = code.html().indexOf('<span class="ng-scope">') != -1 ? code.find('span').html() : code.html();
		elem.find('pre').append(prettyPrintOne(code.replace(/ ng-scope/g,"").replace(/ class="ng-scope"/g,"").replace(/\t/g,"").replace(/</g,'&lt;').replace(/>/g,'&gt;')));
	};
	return dir;
}])

.factory('Nav', [function(){
	var nav = {};
	nav.open = false; // Show/hide nav
	return nav;
}])

.controller('NavCtrl', ['$scope','Nav', function($scope,Nav){
	$scope.nav = Nav;
}])

.run(['$rootScope','$location','Nav',function($root,$loc){
	$root.location = $loc;
}]);